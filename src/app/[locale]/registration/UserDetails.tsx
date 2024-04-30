import { createUser } from '@components/helpers/users'
import { useIdsStore } from '@components/stores/ids'
import { Button, Form, message, Select, Divider, Space } from 'antd'
import Card from 'antd/es/card/Card'
import Input from 'antd/es/input/Input'
import { PlusOutlined } from '@ant-design/icons'

const UserDetails = () => {
  const { setUserId } = useIdsStore()
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const values = form.getFieldsValue()
    if (!values.name || !values.email || !values.idNum) {
      message.error('Please fill in all fields')
      return
    }

    try {
      const res: any = await createUser({
        ...values,
        dob: new Date(values.dob),
      })
      if (!res || res.error) {
        throw new Error(res.error || 'Failed to create user')
      }
      setUserId(res.insertedId)
    } catch (error: any) {
      message.error(error.message)
      return
    }

    message.success('User created')
    setTimeout(() => {
      window.location.href = '/quiz'
    }, 1000)
    return
  }

  return (
    <Card title='Registration' style={{ width: 650 }}>
      <Form form={form} wrapperCol={{ span: 24 }} labelCol={{ span: 4 }}>
        <Form.Item name='name' label='Name'>
          <Input />
        </Form.Item>
        <Form.Item name='email' label='Email'>
          <Input />
        </Form.Item>
        <Form.Item name='idNum' label='ID Number'>
          <Input />
        </Form.Item>
        <Form.Item name='dob' label='Date of Birth'>
          <Input type='date' />
        </Form.Item>
        <Form.Item name='religion' label='Religion'>
          <Select
            options={[
              { label: 'Muslim', value: 'Muslim' },
              { label: 'Christian', value: 'Christian' },
              { label: 'Hindu', value: 'Hindu' },
              { label: 'Buddhist', value: 'Buddhist' },
            ]}
            placeholder='Select a religion'
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  Other
                  <Input
                    placeholder='Please enter item'
                    // ref={inputRef}
                    value={form.getFieldValue('religion')}
                    onChange={(e) =>
                      form.setFieldValue('religion', e.target.value)
                    }
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </Space>
              </>
            )}
          />
        </Form.Item>
      </Form>
      <div className='w-full flex justify-center'>
        <Button type='primary' className='mx-auto' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Card>
  )
}

export default UserDetails
