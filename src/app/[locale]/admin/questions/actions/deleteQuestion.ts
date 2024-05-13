import { destroyQuestion } from "@components/helpers/questions";
import { z } from "zod";

const schema = z.string()

export const deleteQuestion = async (questionId: string)  => {
  const validatedFields = schema.safeParse(questionId)

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      res: null,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Mutate data
  const res = await destroyQuestion(validatedFields.data)

  return { res, error: null }
}