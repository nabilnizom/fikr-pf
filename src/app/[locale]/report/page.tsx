'use client'

import AddProductKeyForm from '@components/app/[locale]/report/AddProductKey'
import { fetchReport } from '@components/helpers/report'
import { getUser } from '@components/helpers/users'
import { useIdsStore } from '@components/stores/ids'
import { useEffect, useState } from 'react'

const ReportPage = () => {
  const { userId, productKey } = useIdsStore()
  const [report, setReport] = useState<any>(null)
  const [downloaded, setDownloaded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const userObj = await getUser({ _id: userId })
      if (userObj.error) {
        console.log(userObj.error)
        return
      }
      const res = await fetchReport({ userId, quizId: 'Quiz101' })
      setReport(res)
    }

    fetchUser()
  }, [userId, productKey])

  if (!productKey) {
    return <AddProductKeyForm />
  }

  const handleDownload = async () => {
    await fetch('/report/view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'FIKR Full Report.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .catch((error) => console.error('Error:', error))

    setDownloaded(true)
    setLoading(false)
  }

  if (report && !downloaded && !loading) {
    setLoading(true)
    handleDownload()
  }
  return !downloaded ? <div>Downloading...</div> : <div>PDF Downloaded!</div>
}

export default ReportPage
