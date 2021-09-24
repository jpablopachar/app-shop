import { IResolvers } from '@graphql-tools/utils'
import mutation from './mutation'
import query from './query'

const resolvers: IResolvers = {
  ...query,
  ...mutation
}

export default resolvers
