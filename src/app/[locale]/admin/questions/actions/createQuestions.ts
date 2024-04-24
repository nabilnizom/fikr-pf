'use server'

import { addQuestion } from '@components/helpers/quiz'
import { z } from 'zod'

const schema = z.object({
  question: z.string({
    invalid_type_error: 'Invalid Question',
  }),
  trait: z.string({
    invalid_type_error: 'Invalid Trait',
  }),
})

export async function createQuestions(formData: FormData) {
  const validatedFields = schema.safeParse({
    question: formData.get('question'),
    trait: formData.get('trait'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Mutate data
  // addQuestion()
}
