"use server"

import { getDbInstance } from "@components/utils/db"
import { ObjectId } from "mongodb"

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

export const updateQuestion = async (questionId: string, data: { question: string, trait: string }) => {
  const db = await getDbInstance()
  try {
    const exist = await db.collection('questions').findOne({ _id: new ObjectId(questionId) })
    if (!exist) {
      throw new Error('Question not found')
    }

    const { question, trait } = data
    const result = await db.collection('questions').updateOne({ _id: new ObjectId(questionId) }, { $set: { question, trait } })
    return result
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const destroyQuestion = async (questionId: string) => {
  const db = await getDbInstance()
  try {
    const result = await db.collection('questions').deleteOne({ _id: new ObjectId(questionId) })
    return result
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const getQuestions = async () => {
  const db = await getDbInstance()
  const questions = await db.collection('questions').find().toArray()
  return questions
}