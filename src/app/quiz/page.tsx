"use client"

import { createAnswer } from "@components/helpers/answers";
import { Traits } from "@components/helpers/report";
import { useIdsStore } from "@components/stores/ids";
import { Button, Form, Radio, message } from "antd";
import {  useState } from "react";

const QuizPage = () => {
  const { userId, setAnswerId } = useIdsStore()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const DUMMY_QUESTIONS = [
    {
      question: 'Yes or no? AG',
      trait: Traits.AG,
    },
    {
      question: 'Yes or no? AH',
      trait: Traits.AH,
    },
    {
      question: 'Yes or no? AN',
      trait: Traits.AN,
    },
    {
      question: 'Yes or no? AU',
      trait: Traits.AU,
    },
    {
      question: 'Yes or no? CO',
      trait: Traits.CO,
    },
    {
      question: 'Yes or no? DP',
      trait: Traits.DP,
    },
    {
      question: 'Yes or no? EM',
      trait: Traits.EM,
    },
    {
      question: 'Yes or no? EN',
      trait: Traits.EN,
    },
    {
      question: 'Yes or no? IN',
      trait: Traits.IN,
    },
    {
      question: 'Yes or no? IT',
      trait: Traits.IT,
    },
    {
      question: 'Yes or no? IV',
      trait: Traits.IV,
    },
    {
      question: 'Yes or no? IS',
      trait: Traits.IS,
    },
    {
      question: 'Yes or no? NU',
      trait: Traits.NU,
    },
    {
      question: 'Yes or no? PR',
      trait: Traits.PR,
    },
    {
      question: 'Yes or no? SC',
      trait: Traits.SC,
    },
    {
      question: 'Yes or no? SF',
      trait: Traits.SF,
    },
    {
      question: 'Yes or no? SP',
      trait: Traits.SP,
    },
    {
      question: 'Yes or no? ST',
      trait: Traits.ST,
    },
    {
      question: 'Yes or no? VT',
      trait: Traits.VT,
    }
  ]

  const handleSubmit = async () => {
    const values = form.getFieldsValue()

    const answers = new Array(200).fill({}).map((_, index) => ({
      questionNo: index,
      answer: values[`question-${index}`]
    }))

    const input = {
      userId,
      quizId: 'Quiz101',
      answers
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
    form.setFieldsValue(new Array(200).fill(0).reduce((acc, _, index) => {
      Math.random() > 0.5 ? acc[`question-${index}`] = false : acc[`question-${index}`] = true
      return acc
    }, {} as any))
  }

  const Questions = () => {
    const max = 200
    return Array.from({ length: max }, (_, i) => {
      const question = DUMMY_QUESTIONS[i % DUMMY_QUESTIONS.length].question
      return (
        <Form.Item key={i} name={`question-${i}`} label={`${i + 1} - ${question}`} labelAlign='left'>
          <Radio.Group optionType='button'>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      )
    })
  }

  return (
      <div className="p-10">
        <span>{}</span>
        <span className="text-lg mr-5">Quiz questions (each true will count as 3 points. All true = 10 points)</span>
        <Button loading={loading} onClick={() => {
          devModeSet()
          setLoading(false)
        }}>Auto set</Button>
        <div className="h-5"></div> {/* Spacer */}
        <Form form={form} layout='vertical'>
          <Questions />
        </Form>
        <div className="h-5"></div> {/* Spacer */}
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </div>
  )
}

export default QuizPage;