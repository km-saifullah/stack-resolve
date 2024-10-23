import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

const tokenSecret = process.env.TOKEN_SECRET
const tokenExpires = process.env.TOKEN_EXPIRES

export { serverPort, dbUrl, tokenSecret, tokenExpires }
