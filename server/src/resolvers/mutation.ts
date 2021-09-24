import { IResolvers } from '@graphql-tools/utils'
import { hashSync } from 'bcrypt'
import { Db } from 'mongodb'
import { COLLECTIONS } from '../config/constants'

const resolversMutation: IResolvers = {
  Mutation: {
    async register (_, { user }, { db }): Promise<{ status: boolean, message: string, user: any | null }> {
      const userCheck = await (db as Db).collection(COLLECTIONS.USERS).findOne({ email: user.email })

      if (userCheck !== null) {
        return {
          status: false,
          message: `The email ${user.email} is already registered`,
          user: null
        }
      }

      const lastUser = await db
        .collection(COLLECTIONS.USERS)
        .find()
        .limit(1)
        .sort({ registerDate: -1 })
        .toArray()

      if (lastUser.length === 0) {
        user.id = 1
      } else {
        user.id = lastUser[0].id + 1
      }

      user.registerDate = new Date().toISOString()
      user.password = hashSync(user.password, 10)

      return await db
        .collection(COLLECTIONS.USERS)
        .insertOne(user)
        .then(async () => ({
          status: true,
          message: 'The user has successfully registered',
          user
        }))
        .catch((err: Error) => {
          console.log(err.message)

          return {
            status: false,
            message: 'An unexpected error occurred',
            user: null
          }
        })
    }
  }
}

export default resolversMutation
