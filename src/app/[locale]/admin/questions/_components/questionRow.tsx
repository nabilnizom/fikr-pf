'use client'

import { EllipsisOutlined, CheckOutlined } from '@ant-design/icons'
import { Traits } from '@components/helpers/enums'
import { Popover, message } from 'antd'
import Input from 'antd/es/input/Input'
import { useState } from 'react'
import { editQuestion } from '../actions/editQuestion'
import { deleteQuestion } from '../actions/deleteQuestion'

const QuestionRow = ({ q, index }: any) => {
  const [editId, setEditId] = useState<string | null>(null)
  const traits = Object.keys(Traits)
  const [questionObj, setQuestionObj] = useState<any>(q)
  
  const [newQuestion, setNewQuestion] = useState<string | null>(q.question)
  const [trait, setTrait] = useState<string | null>(q.trait)

  if (!questionObj._id) return <></>

  const handleDelete = async () => {
    const res = await deleteQuestion(q._id.toString())
    if (res.error) {
      message.error('Failed to delete question')
    } else {
      message.success('Question Deleted')
    }
    setEditId(null)
    setQuestionObj({})
  }

  const handleEdit = async () => {
    const res = await editQuestion(q._id.toString(), { question: newQuestion || '', trait: trait as Traits })
    if (res.error) {
      message.error(res.error as string)
    } else {
      message.success('Question Updated')
    }
    setEditId(null)
    setQuestionObj({ question: newQuestion, trait: trait, _id: q._id })
  }

  return (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
      <td className='border py-2 text-center'>{index + 1}</td>
        {
          editId === questionObj?._id?.toString()
          ? (
              <>
                <td className='border p-2'>
                  <div className='flex gap-2'>
                    <Input
                      onChange={(e) => setNewQuestion(e.target.value)}
                      defaultValue={questionObj.question}
                      type='text'
                      name='question'
                      id='question'
                      className='rounded-lg w-full'
                      placeholder='Insert Question Here'
                      required
                      />
                    <button>
                      <CheckOutlined onClick={handleEdit}/>
                    </button>
                  </div>
                </td>
                <td className='border py-2 text-center'>
                  <select defaultValue={trait || ''} onChange={(e) => setTrait(e.target.value)} name='trait' id='trait' required className='rounded-lg p-2'>
                    {traits.map((trait: string) => (
                      <option key={trait} value={trait}>
                        {trait}
                      </option>
                    ))}
                  </select>
                </td>
              </>
            )
            : 
            <>
              <td className='border p-2'>{questionObj.question}</td>
              <td className='border py-2 text-center'>{questionObj.trait}</td>
            </>
        }
      <td className='border py-2 text-center'>
        <Popover
          trigger='click'
          placement='rightTop'
          content={
            <div className='flex flex-col gap-2'>
              <button className='bg-blue-500 text-white rounded-lg p-2' onClick={() => setEditId(questionObj._id.toString())}>Edit</button>
              <button className='bg-red-500 text-white rounded-lg p-2' onClick={handleDelete}>Delete</button>
            </div>
          }
        >
          <button>
            <EllipsisOutlined rotate={90} />
          </button>
        </Popover>
      </td>
    </tr>
  )
}

export default QuestionRow