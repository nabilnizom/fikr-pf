"use server"

import { insertData } from "@components/helpers/shared"
import { getDbInstance } from "@components/utils/db"
import { ObjectId } from "mongodb"
import { z } from "zod"

export const createQuizInputValidation = (input: any) => {
  const schema = z.object({
    title: z.string().min(1),
    questions: z.array(z.object({
      no: z.number(),
      question: z.string().min(1),
      trait: z.string().min(1),
    }))
  })

  return schema.parse(input)
}

export const addQuestionInputValidation = (input: any) => {
  const schema = z.object({
    question: z.object({
      no: z.number(),
      question: z.string().min(1),
      trait: z.string().min(1),
    })
  })

  return schema.parse(input)
}

export const getQuiz = async (quizId: string) => {
  const db = await getDbInstance()
  const quiz = await db.collection('quizzes').findOne({ _id: new ObjectId(quizId) })

  if (!quiz) {
    throw new Error('Quiz not found')
  }

  return quiz
}

export const getQuizzes = async () => {
  const db = await getDbInstance()
  const quizzes = await db.collection('quizzes').find().toArray()
  return quizzes
}

export const createQuiz = async (input: any) => {
  return insertData('quizzes', input, createQuizInputValidation)
}

export const addQuestion = async (quizId: string, questions: any) => {
  const db = await getDbInstance()
  const quiz = await db.collection('quizzes').findOne({ _id: new ObjectId(quizId) })

  if (!quiz) {
    throw new Error('Quiz not found')
  }

  const newQuestions = [...quiz.questions, ...questions]
  return db.collection('quizzes').updateOne({ _id: new ObjectId(quizId) }, { $set: { questions: newQuestions } }, { upsert: true })
}

export const deleteQuestion = async (quizId: string, questionNo: number) => {
  const db = await getDbInstance()
  const quiz = await db.collection('quizzes').findOne({ _id: new ObjectId(quizId) })

  if (!quiz) {
    throw new Error('Quiz not found')
  }

  const newQuestions = quiz.questions.filter((question: any) => question.no !== questionNo)
  return db.collection('questions').updateOne({ _id: new ObjectId(quizId) }, { $set: { questions: newQuestions } }, { upsert: true })
}