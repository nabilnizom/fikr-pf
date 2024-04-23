"use server"

import config from "@components/config"
import { getQuiz } from "@components/helpers/quiz"
import { z } from "zod"

export enum Traits {
  AG = 'AG',
  AH = 'AH',
  AN = 'AN',
  AU = 'AU',
  CO = 'CO',
  DP = 'DP',
  EM = 'EM',
  EN = 'EN',
  IN = 'IN',
  IT = 'IT',
  IV = 'IV',
  IS = 'IS',
  NU = 'NU',
  PR = 'PR',
  SC = 'SC',
  SF = 'SF',
  SP = 'SP',
  ST = 'ST',
  VT = 'VT',
}

export const fetchReportInputValidation = async (input: any) => {
  const traitScoreSchema = z.object({
    code: z.string(),
    score: z.number(),
  })
  
  const applicantSchema = z.object({
    name: z.string(),
    date_of_birth: z.string(),
    religion: z.string(),
    company_url: z.string(),
  })
  
  const pdfSchema = z.object({
    lang: z.string(),
    applicant: applicantSchema,
    averageTraitScore: z.array(traitScoreSchema),
    traits: z.array(traitScoreSchema),
  })
  
  return pdfSchema.parse(input)
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
    [Traits.AG]: 0,
    [Traits.AH]: 0,
    [Traits.AN]: 0,
    [Traits.AU]: 0,
    [Traits.CO]: 0,
    [Traits.DP]: 0,
    [Traits.EM]: 0,
    [Traits.EN]: 0,
    [Traits.IN]: 0,
    [Traits.IT]: 0,
    [Traits.IV]: 0,
    [Traits.IS]: 0,
    [Traits.NU]: 0,
    [Traits.PR]: 0,
    [Traits.SC]: 0,
    [Traits.SF]: 0,
    [Traits.SP]: 0,
    [Traits.ST]: 0,
    [Traits.VT]: 0
  })

  return traits
}

export const fetchReport = async (input: any) => {
  const validated = await fetchReportInputValidation(input)

  const res = await fetch(config.pdfGen.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(validated)
  })
}