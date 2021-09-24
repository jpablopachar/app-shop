import { ApolloServer } from 'apollo-server-express'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import { Db } from 'mongodb'
import morgan from 'morgan'
import { Icontext } from './interfaces/context'
import { Database } from './lib/database'
import schema from './schemas'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

async function init (): Promise<void> {
  const app = express()
  const database = new Database()
  const db = await database.init()

  app.set('port', process.env.PORT || 3000)

  app.use(morgan('dev'))
  app.use(cors())
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  const context = async ({ req, connection }: Icontext): Promise<{ db: Db | undefined, token: string }> => {
    const token = req ? req.headers.authorization : connection.authorization

    return { db, token }
  }

  const server = new ApolloServer({
    schema,
    introspection: true,
    context
  })

  server.applyMiddleware({ app })

  app.get('/', expressPlayground({ endpoint: '/graphql' }))

  app.listen(app.get('port'), () =>
    console.log(`Server on port ${app.get('port')}`)
  )
}

init()
