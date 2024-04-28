"use server"

import { getClientInstance, getDbInstance } from "@components/utils/db"
import { ObjectId } from "mongodb"
import { v4 as uuidv4 } from "uuid"

export interface ProductKey {
  key: string
  companyId: string
  isUsed: boolean
}

export const generateKeys = async (companyId: string, count: number) => {
  if (!count || !companyId) {
    return new Response('Product Key count is required', { status: 400 })
  }

  let keys: any = []
  for (let i = 0; i < count; i++) {
    const newKey = uuidv4()
    keys.push(newKey)
  }

  const db = await getDbInstance()

  try {
    await Promise.all(keys.map((key: string) => {
      return db.collection('productKeys').insertOne({
        key,
        companyId,
        isUsed: false
      })
    }))

    return { ok: true }
    
  } catch (err) {
    console.error(err)
  }
}

export const assignKey = async (key: string, userId: string) => {
  const client = await getClientInstance()
  const db = client.db('potentialforge')
  const keyDoc = await db.collection('productKeys').findOne({ key })
  
  if (!keyDoc) return { error: 'Key not found'}
  if (keyDoc.isUsed) return { error: 'Key already used' }
  
  const rtnObj: any = {}
  const session = client.startSession()

  try {
    await session.withTransaction(async () => {
      await Promise.all([
        db.collection('productKeys').updateOne({ key }, { $set: { isUsed: true } }, { session }),
        db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { productKey: key } }, { session })
      ])
      rtnObj.ok = true
    })
  } catch (err) {
    console.error(err)
    rtnObj.error = 'Error assigning key'
  }

  return rtnObj
}

export const getKeys = async (companyId: string, showUsed?: boolean) => {
  const db = await getDbInstance()

  const query: any = { companyId }

  if (!showUsed) {
    query['isUsed'] = false
  }

  const keys = await db.collection('productKeys').find(query).toArray()
  return keys
}