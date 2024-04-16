import { getDbInstance } from "@components/utils/db"

test('Connect, write and read from the database', async () => {
  const db = await getDbInstance()
  const collection = db.collection('test')
  const testDate = new Date()
  await collection.insertOne({ testDate, success: true })
  const result: any = await collection.findOne({ testDate })
  const { success } = result
  expect(success).toBe(true)

  // Clean up
  await collection.deleteOne({ _id: result._id })
  await db.dropCollection('test')
})