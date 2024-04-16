import appConfig from "@components/config"
import { MongoClient, ServerApiVersion } from "mongodb"

export const getDbInstance = async () => {
  const client = new MongoClient(appConfig.mongo.url)
  try {
    await client.connect()
    const db = client.db(appConfig.mongo.db)
    
    return db
  } catch (err) {
    console.log(err)
    throw new Error('Error connecting to db')
  }
}

export const getClientInstance = async () => {
  const client = new MongoClient(appConfig.mongo.url)
  try {
    await client.connect()
    return client
  } catch (err) {
    console.log(err)
    throw new Error('Error connecting to db')
  }

}