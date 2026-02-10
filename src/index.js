import dotenv, { config } from 'dotenv'
import DBConnect from './db/Connection.js'

dotenv.config({
    path: './env'
})

DBConnect()