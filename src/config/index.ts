import dotenv from 'dotenv'
import path from 'path'
// dotenv.config({path : path.join(process.cwd(), ".env")})
dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  dataBase_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env:process.env.NODE_ENV,
  salt_round:process.env.SALT_ROUND
}
