
import { Db, MongoClient } from 'mongodb'
import { MONGODB_URL } from '../config/constants'

export class Database {
  public async init (): Promise<Db | undefined> {
    try {
      const urlMongoDb = (MONGODB_URL as string)
      const client = await MongoClient.connect(urlMongoDb)

      const db: Db = client.db()

      console.log(`Database ${db.databaseName} is conected`)

      return db
    } catch (error) {
      console.log(error)
    }
  }
}
