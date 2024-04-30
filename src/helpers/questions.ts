"use server"

import { getDbInstance } from "@components/utils/db"

export const addQuestion = async (input: { question: string, trait: string }) => {
  const db = await getDbInstance()
  try {
    const result = await db.collection('questions').insertOne(input)
    return result
  } catch (error) {
    console.error(error)
    return { error: 'Failed to add question' }
  }
}

export const getQuestions = async () => {
  const db = await getDbInstance()
  const questions = await db.collection('questions').find().toArray()
  return questions
}