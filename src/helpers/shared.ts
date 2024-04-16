"use server"

import { getDbInstance } from "@components/utils/db"

export const insertData = async (collectionName: string, input: any, validation?: (input: any) => any) => {
  let data
  if (validation) {
    data = validation(input)
  } else {
    data = input
  }
  
  const db = await getDbInstance()
  const res = await db.collection(collectionName).insertOne(input)

  return res
}