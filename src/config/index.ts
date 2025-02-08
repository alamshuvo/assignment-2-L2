import dotenv from 'dotenv'
import path from 'path'
// dotenv.config({path : path.join(process.cwd(), ".env")})
dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  dataBase_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env:process.env.NODE_ENV,
  salt_round:process.env.SALT_ROUND,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_expires_in:process.env.JWT_EXPIRES_IN,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expiries_in:process.env.JWT_REFRESH_EXPIRES_IS
}
