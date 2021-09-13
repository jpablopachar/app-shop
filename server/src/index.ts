import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(cors())
app.use(compression)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(app.get('port'), () =>
  console.log(`Server on port ${app.get('port')}`)
)
