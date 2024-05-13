'use server'

import { Traits } from '@components/helpers/enums'
import { updateQuestion } from '@components/helpers/questions'
import z from 'zod'

const schema = z.object({
  question: z.string({
    invalid_type_error: 'Invalid Question',
  }),
  trait: z.string({
    invalid_type_error: 'Invalid Trait',
  }),
})

export const editQuestion = async (questionId: string, data: { question: string, trait: Traits}) => {
  const validatedFields = schema.safeParse({
    question: data.question,
    trait: data.trait,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      res: null,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Mutate data
  const res = await updateQuestion(questionId, validatedFields.data)

  return { res, error: null }
}