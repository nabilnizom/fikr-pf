'use client'

import { generateKeys, getKeys } from '@components/helpers/keys'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

const AdminKeygenPage = () => {
  const [form] = Form.useForm()
  const [keys, setKeys] = useState<any[]>([])

  const onSearch = async () => {
    const values = form.getFieldsValue()
    const { companyId, showUsed } = values

    const data = await getKeys(companyId, showUsed)
    if (data?.length) {
      setKeys(data)
    }
    console.log('data ====>', JSON.stringify(data, undefined, 2))
  }

  const onGenerate = async () => {
    const values = form.getFieldsValue()
    const { companyId, count } = values

    const res = await generateKeys(companyId, count)
    if (res?.ok) {
      await onSearch()
    }
  }

  return (
    <main className='w-full container mx-auto px-2 py-10 flex flex-col gap-5'>
      <h1 className='text-xl font-semibold mb-2'>Generate Keys</h1>
      <Form form={form} className=''>
        <Form.Item label='Company ID' name='companyId' className='w-1/2'>
          <Input />
        </Form.Item>
        <div className='flex gap-3'>
          <Form.Item label='Show used keys' name='showUsed'>
            <Input type='checkbox' />
          </Form.Item>
          <Button onClick={onSearch} className='btn-primary'>
            Search
          </Button>
        </div>
        <div className='flex gap-3'>
          <Form.Item label='Number of keys' name='count'>
            <Input type='number' />
          </Form.Item>
          <Button onClick={onGenerate} className='btn-primary'>
            Generate
          </Button>
        </div>
      </Form>

      <div>
        {!!keys?.length &&
          keys.map((key, index) => (
            <div
              key={key.key}
              className={`${
                key.isUsed
                  ? 'bg-slate-300 text-slate-400 border-slate-400'
                  : 'bg-white text-slate-800 border-slate-50'
              } px-3 py-1 border rounded rounded-lg flex justify-between shrink mb-2 w-1/2 items-center`}
            >
              <div className='flex gap-2'>
                {key.key}
                {key.isUsed ? (
                  <span className='text-xs text-green-500'>Available</span>
                ) : (
                  <CheckCircleOutlined className='text-green-500' />
                )}
              </div>
              {!key.isUsed && (
                <Button
                  className='self-end'
                  onClick={() => navigator.clipboard.writeText(key.key)}
                >
                  Copy
                </Button>
              )}
            </div>
          ))}
      </div>
    </main>
  )
}

export default AdminKeygenPage
