'use client'

import { createAnswer } from '@components/helpers/answers'
import { getQuestions } from '@components/helpers/questions'
import { useIdsStore } from '@components/stores/ids'
import { Button, Form, Radio, message } from 'antd'
import { useEffect, useState } from 'react'

const QuizPage = () => {
  const { userId, setAnswerId } = useIdsStore()
  const [loading, setLoading] = useState(false)
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
    form.setFieldsValue(
      questions.reduce((acc: any, question: any, i: number) => {
        Math.random() > 0.5
          ? (acc[question._id] = true)
          : (acc[question._id] = false)
        return acc
      }, {})
    )
  }

  const Questions = () => {
      return questions.map((question: any, i: number) => (
        <Form.Item
          key={i}
          name={question._id}
          label={`${i + 1} - ${question.question}`}
          labelAlign='left'
        >
          <Radio.Group optionType='button'>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      ))
  }

  return (
    <div className='p-10'>
      <span>{}</span>
      <span className='text-lg mr-5'>
        Quiz questions (each true will count as 3 points. All true = 10 points)
      </span>
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
