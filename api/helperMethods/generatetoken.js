const jwt = require('jsonwebtoken');

secret = process.env.SECRET_KEY || 'secret'

const GenToken =(data)=>{
  return jwt.sign(data,secret,{ expiresIn: 60 * 60 })
}

module.exports = GenToken
