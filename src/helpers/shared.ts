"use server"

import { getDbInstance } from "@components/utils/db"

export const insertData = async (collectionName: string, input: any, validation?: (input: any) => any) => {
  let data
  if (validation) {
    data = await validation(input)
  } else {
    data = input
  }
  
  if (!data) {
    return { error: 'Invalid input' }
  }

  const db = await getDbInstance()
  const res = await db.collection(collectionName).insertOne(data)

  return res
}