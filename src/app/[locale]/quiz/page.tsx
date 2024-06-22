'use client'

import { createAnswer } from '@components/helpers/answers'
import { getQuestions } from '@components/helpers/questions'
import { useIdsStore } from '@components/stores/ids'
import { Button, Form, Radio, message } from 'antd'
import { useEffect, useState } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const QuizPage = () => {
  const { userId, setAnswerId } = useIdsStore()
  const [loading, setLoading] = useState(false)
  const [trueQuestions, setTrueQuestions] = useState<any[]>([])
  const [falseQuestions, setFalseQuestions] = useState<any[]>([])
  const [form] = Form.useForm()

  const [questions, setQuestions] = useState<any>([])

  const fetchQuestions = async () => {
    const res = await getQuestions()
    setQuestions(res)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  if (!questions?.length) return <div>Loading...</div>

  const handleSubmit = async () => {
    const values = form.getFieldsValue()

    const answers = Object.keys(values).map((key) => {
      return {
        trait: questions.find((q: any) => q._id === key).trait,
        answer: values[key],
      }
    })

    const input = {
      userId,
      quizId: 'Quiz101',
      answers,
    }

    const res: any = await createAnswer({ ...input })
    if (!res || res.error) {
      message.error(res.error || 'Failed to submit answers')
    } else {
      setAnswerId(res.insertedId)
      message.success('Answers submitted')
      setTimeout(() => {
        window.location.href = '/report'
      }, 1000)
    }
  }

  const devModeSet = () => {
    setLoading(true)
    const randomAns = questions.reduce((acc: any, question: any, i: number) => {
      const isTrue = Math.random() > 0.5
      if (isTrue) {
        acc[question._id] = true
      } else {
        acc[question._id] = false
      }
      return acc
    }, {})
    form.setFieldsValue(randomAns)

    const trueQ = Object.keys(randomAns).filter((key) => randomAns[key])
    const falseQ = Object.keys(randomAns).filter((key) => !randomAns[key])
    setTrueQuestions(trueQ)
    setFalseQuestions(falseQ)
  }

  const Questions = () => {
    return questions.map((question: any, i: number) => (
      <Form.Item
        key={i}
        name={question._id}
        label={`${i + 1} - ${question.question}`}
        labelAlign='left'
      >
        <div className='flex gap-2'>
          <button
            className={`border border-4 border-white py-1.5 px-4 rounded-full text-white font-semibold bg-green-500 flex items-center justify-around gap-2 ${
              trueQuestions.includes(question._id)
                ? 'bg-green-700'
                : 'hover:bg-green-600'
            }`}
            onClick={() => {
              setTrueQuestions([...trueQuestions, question._id])
              setFalseQuestions(
                falseQuestions.filter((q) => q !== question._id)
              )
              form.setFieldsValue({ [question._id]: true })
            }}
          >
            <CheckOutlined /> YES
          </button>
          <button
            className={`border border-4 border-white py-1.5 px-4 rounded-full text-white font-semibold bg-red-500 hover:bg-red-600 flex items-center justify-around gap-2 ${
              falseQuestions.includes(question._id)
                ? 'bg-red-700'
                : 'hover:bg-green-600'
            }`}
            onClick={() => {
              setFalseQuestions([...falseQuestions, question._id])
              setTrueQuestions(trueQuestions.filter((q) => q !== question._id))
              form.setFieldsValue({ [question._id]: false })
            }}
          >
            <CloseOutlined /> No
          </button>
        </div>
      </Form.Item>
    ))
  }

  return (
    <div className='p-10 w-1/2 mx-auto bg-neutral-50'>
      <span className='text-lg mr-5'>Quiz questions</span>
      <Button
        loading={loading}
        onClick={() => {
          devModeSet()
          setLoading(false)
        }}
      >
        Auto set
      </Button>
      <div className='h-5'></div> {/* Spacer */}
      <Form form={form} layout='vertical'>
        <Questions />
      </Form>
      <div className='h-5'></div> {/* Spacer */}
      <Button type='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default QuizPage
