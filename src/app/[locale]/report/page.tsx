'use client'

import AddProductKeyForm from '@components/app/[locale]/report/AddProductKey'
import { getUser } from '@components/helpers/users'
import { useIdsStore } from '@components/stores/ids'
import { useEffect, useState } from 'react'

const ReportPage = () => {
  const { userId, productKey, setProductKey } = useIdsStore()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser({ _id: userId })
      if (user.error) {
        console.log(user.error)
        return
      }
      setUser(user)
    }

    fetchUser()
  }, [userId])

  useEffect(() => {
    if (!user) {
      return
    }

    const productKey = user.productKey
    setProductKey(productKey)
  }, [user])

  if (!productKey) {
    return <AddProductKeyForm />
  }

  return <div></div>
}

export default ReportPage
