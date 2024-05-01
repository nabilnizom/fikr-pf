'use client'

import { generateKeys, getKeys } from '@components/helpers/keys'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Tabs, { TabsProps } from 'antd/es/tabs'

const AdminKeygenPage = () => {
  enum Tab {
    Gen = 'generate',
    Search = 'search',
  }

  const [form] = Form.useForm()
  const [keys, setKeys] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Search)

  const onSearch = async () => {
    const values = form.getFieldsValue()
    const { companyId, showUsed } = values

    const data = await getKeys(companyId, showUsed)
    if (data?.length) {
      setKeys(data)
    }
  }

  const onGenerate = async () => {
    const values = form.getFieldsValue()
    const { companyId, count, price } = values

    const res = await generateKeys(companyId, count, Number(price))
    if (res?.ok) {
      await onSearch()
    }
  }

  const TabItems: TabsProps['items'] = [
    {
      key: 'generate',
      label: 'Generate Keys',
      children: (
        <div className='w-1/4'>
          <Form.Item labelCol={{ span: 6 }} label='Company ID' name='companyId'>
            <Input />
          </Form.Item>
          <Form.Item labelCol={{ span: 6 }} label='Count' name='count'>
            <Input type='number' />
          </Form.Item>
          <Form.Item labelCol={{ span: 6 }} label='Price per key' name='price'>
            <Input type='number' />
          </Form.Item>
          <div className='flex justify-end gap-3'>
            <Button onClick={onGenerate} className='btn-primary'>
              Generate
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: 'search',
      label: 'Search Keys',
      children: (
        <div className='w-1/4'>
          <Form.Item labelCol={{ span: 8 }} label='Company ID' name='companyId'>
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            label='Show used keys'
            name='showUsed'
            wrapperCol={{ span: 1 }}
          >
            <Input type='checkbox' />
          </Form.Item>
          <div className='flex justify-end gap-3'>
            <Button onClick={onSearch} className='btn-primary'>
              Search
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className='w-full container mx-auto px-2 py-10 flex flex-col gap-5'>
      <h1 className='text-xl font-semibold mb-2'>Keys</h1>
      <Form form={form} className=''>
        <Tabs
          items={TabItems}
          activeKey={activeTab}
          onChange={(value) => setActiveTab(value as Tab)}
        />
      </Form>

      {activeTab === Tab.Search && (
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
      )}
    </main>
  )
}

export default AdminKeygenPage
