"use server"

import { insertData } from "@components/helpers/shared"
import { getDbInstance } from "@components/utils/db"
import { z } from "zod"

export interface User {
  name: string
  email: string
  idNum: string
  productKey?: string
}

export const validateCreateUserInput = (input: any) => {
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

export const getUser = async (idNum: string) => {
  const db = await getDbInstance()
  const user = await db.collection('users').findOne({ idNum })
  if (!user) return { error: 'User not found' }
  return {
    ...user,
    _id: user._id.toString()
  }
}

export const createUser = async (input: any) => {
  return insertData('users', input, validateCreateUserInput)
}