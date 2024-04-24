'use client'

import { Button, Input } from "antd"

const AddProductKeyForm = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full bg-white p-5 rounded-lg w-[400px] gap-2">
        <p className="mb-5">Insert Product Key to view full result</p>
        <Input placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"/>
        <Button type="primary">Submit</Button>
      </div>
    </div>
  )
}

export default AddProductKeyForm