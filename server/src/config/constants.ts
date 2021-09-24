import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

/* eslint-disable no-unused-vars */
export const MONGODB_URL = process.env.MONGODB_URL
export const SECRET_KEY = process.env.SECRET
export enum COLLECTIONS {
  USERS = 'users'
}
export enum MESSAGES {
  TOKEN_VERIFICATION_FAILED = 'Invalid token'
}

export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3
}
