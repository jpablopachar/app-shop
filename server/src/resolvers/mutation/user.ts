import { IResolvers } from '@graphql-tools/utils'
import { hashSync } from 'bcrypt'
import { COLLECTIONS } from '../../config/constants'
import { asignDocumentId, findOneElement, insertOneElement } from '../../lib/db-operations'

const resolversUserMutation: IResolvers = {
  Mutation: {
    async register (_, { user }, { db }): Promise<{ status: boolean, message: string, user: any | null }> {
      const userCheck = await findOneElement(db, COLLECTIONS.USERS, { email: user.email })

      if (userCheck !== null) {
        return {
          status: false,
          message: `The email ${user.email} is already registered`,
          user: null
        }
      }

      user.id = await asignDocumentId(db, COLLECTIONS.USERS, { registerDate: -1 })
      user.registerDate = new Date().toISOString()
      user.password = hashSync(user.password, 10)

      return await insertOneElement(db, COLLECTIONS.USERS, user)
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

export default resolversUserMutation
