"use server"

import { insertData } from "@components/helpers/shared"
import { getDbInstance } from "@components/utils/db"
import { ObjectId } from "mongodb"
import { z } from "zod"

export interface User {
  name: string
  email: string
  idNum: string
  productKey?: string
}

export const validateCreateUserInput = async (input: any) => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    idNum: z.string().min(1),
    dob: z.date(),
    religion: z.string().min(1),
  })

  return schema.parse(input)
}

export const getUser = async ({_id, idNum}: {_id?: string, idNum?: string}) => {
  if (!_id && !idNum) return { error: 'Invalid input' }

  const db = await getDbInstance()
  const user = _id ? await db.collection('users').findOne({ _id: new ObjectId(_id) }) : await db.collection('users').findOne({ idNum })
  if (!user) return { error: 'User not found' }
  return {
    ...user,
    _id: user._id.toString()
  }
}

export const createUser = async (input: any) => {
  const db = await getDbInstance()
  const user = await db.collection('users').findOne({ idNum: input.idNum })

  if (user) {
    const answer = await db.collection('answers').findOne({ userId: user._id.toString() })
    if (answer) return { exist: true, error: 'User already exists', user: {...user, answer} }
    return { exist: true, error: 'User already exists', user }
  }

  return insertData('users', input, validateCreateUserInput)
}