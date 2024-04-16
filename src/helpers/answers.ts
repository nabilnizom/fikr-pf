"use server"

import { insertData } from "@components/helpers/shared"
import { getDbInstance } from "@components/utils/db"
import { z } from "zod"

export const answerQuizInputValidation = (input: any) => {
  const schema = z.object({
    userId: z.string().min(1),
    quizId: z.string().min(1),
    answers: z.array(z.object({
      questionNo: z.number(),
      answer: z.boolean()
    }))
  })

  return schema.parse(input)
}

export const getAnswer = async (userId: string, quizId: string) => {
  const db = await getDbInstance()
  const answer = await db.collection('answers').findOne({ userId, quizId })

  if (!answer) {
    throw new Error('Answer not found')
  }

  return answer

}

export const createAnswer = async (input: any) => {
  return insertData('answers', input, answerQuizInputValidation)
}