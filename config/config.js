require('dotenv').config();

const config = {

  env: process.env.NODE_ENV || 'dev',
  isProd:process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  apiUrl: process.env.API_URL,
  dbUrl: process.env.DATABASE_URL,
  passMailer:process.env.PASS_MAILER,
  userMailer: process.env.USER_MAILER
}


module.exports = { config }


