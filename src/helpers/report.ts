"use server"

import { ObjectId } from "mongodb"
import { getDbInstance } from "@components/utils/db"
// import puppeteer from "puppeteer/src/puppeteer.js"
import { z } from "zod"
import { Traits } from "./enums"


export const fetchReportInputValidation = async (input: any) => {
  const traitScoreSchema = z.object({
    code: z.string(),
    score: z.number(),
  })
  
  const applicantSchema = z.object({
    name: z.string(),
    date_of_birth: z.string(),
    religion: z.string()
  })
  
  const pdfSchema = z.object({
    lang: z.string(),
    applicant: applicantSchema,
    averageTraitScore: z.array(traitScoreSchema),
    traits: z.array(traitScoreSchema),
  })
  
  return pdfSchema.parse(input)
}

export const calculateTraits = async (answerInput: any) => {
  const traits = answerInput.answers?.reduce((acc: any, { trait, answer }: { trait: string, answer: boolean}) => {
    if (!acc[trait] && acc[trait] !== 0) {
      throw new Error(`Trait ${trait} not found`)
    }

    acc[trait] += answer ? 1 : 0

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

export const calculateAverageTraitScore = async (traits: any) => {
  const pleasantAgreeable = (traits[Traits.DP] + traits[Traits.NU] + traits[Traits.EM]) / 3
  const openEmotionallyStable = (traits[Traits.VT] + traits[Traits.IN] + traits[Traits.NU] + traits[Traits.AH] + traits[Traits.AN]) / 5
  const conscientiousness = (traits[Traits.SP] + traits[Traits.ST] + traits[Traits.IT] + traits[Traits.AU] + traits[Traits.CO]) / 5
  const visionary = (traits[Traits.EN] + traits[Traits.AG] + traits[Traits.PR] + traits[Traits.SF]) / 4

  return {
    pleasantAgreeable,
    openEmotionallyStable,
    conscientiousness,
    visionary
  }
}

export const fetchReport = async (input: {userId: string, quizId: string}) => {
  const db = await getDbInstance()
  const { userId, quizId } = input

  if (!userId || !quizId) {
    return { error:'Invalid input' }
  }

  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) })
  const answer = await db.collection('answers').findOne({ userId, quizId })
  
  if (!answer) {
    return { error: 'Answer not found' }
  } else if (!user) {
    return { error: 'User not found' }
  }
  
  const traits = await calculateTraits(answer)
  const formattedTraits = Object.keys(traits).map((trait) => ({ code: trait, score: traits[trait] }))
  const {
    pleasantAgreeable,
    openEmotionallyStable,
    conscientiousness,
    visionary
  } = await calculateAverageTraitScore(traits)

  const averageTraitScore = [
    { code: "pleasant_agreeable", score: pleasantAgreeable },
    { code: "open_emotionally_stable", score: openEmotionallyStable },
    { code: "conscientiousness", score: conscientiousness },
    { code: "visionary", score: visionary }
  ]

  const body = {
    lang: 'en',
    applicant: {
      name: user.name,
      date_of_birth: user.dob.toDateString(),
      religion: user.religion,
      company_url: user.company_url
    },
    averageTraitScore,
    traits: formattedTraits
  }

  return body
}
