require('dotenv').config();

const config = {

    env: process.env.NODE_ENV || 'dev',
    isProd:process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    apiUrl: process.env.API_URL,

}


module.exports = { config }


