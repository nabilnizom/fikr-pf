"use server"

import { getQuiz } from "@components/helpers/quiz"
import { z } from "zod"

export const fetchReportInputValidation = async (input: any) => {
  const schema = z.object({
    userId: z.string().min(1),
    quizId: z.string().min(1)
  })

  return schema.parse(input)
}

export const calculateAnswerPoints = async (answerInput: any) => {
  const quiz = await getQuiz(answerInput.quizId)
  const traits = answerInput.answers?.reduce((acc: any, { questionNo, answer }: { questionNo: number, answer: boolean}) => {
    const question = quiz.questions.find((question: any) => question.no === questionNo)
    if (!question) {
      throw new Error(`Question ${questionNo} not found`)
    }

    if (!acc[question.trait]) {
      throw new Error(`Trait ${question.trait} not found`)
    }

    acc[question.trait] += answer ? 1 : 0

    return acc
  }, {
    AG: 0,
    AH: 0,
    AN: 0,
    AU: 0,
    CO: 0,
    DP: 0,
    EM: 0,
    EN: 0,
    IN: 0,
    IT: 0,
    IV: 0,
    LS: 0,
    NU: 0,
    PR: 0,
    SC: 0,
    SF: 0,
    SP: 0,
    ST: 0,
    VT: 0
  })

  return traits
}