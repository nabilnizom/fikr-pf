'use client'

import { useState } from 'react'
import { Button, Input } from 'antd'
import { assignKey } from '@components/helpers/keys'
import { useIdsStore } from '@components/stores/ids'
import message from 'antd/es/message'

const AddProductKeyForm = () => {
  const { userId, setProductKey } = useIdsStore()
  const [key, setKey] = useState('')

  const handleSubmit = async () => {
    const res = await assignKey(key, userId)
    if (res.error) {
      message.error(res.error)
    } else {
      setProductKey(key)
      message.success('Product Key assigned successfully')
    }
  }

  return (
    <div className='min-w-screen min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-full bg-white p-5 rounded-lg w-[400px] gap-2'>
        <p className='mb-5'>Insert Product Key to view full result</p>
        <Input
          onChange={(e) => setKey(e.target.value)}
          placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        />
        <Button type='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default AddProductKeyForm
