const jwt = require('jsonwebtoken')

// function to check if headers contain valid token
const checkToken = (req, res, next) =>{
  token = req.headers.authorization
  secret = process.env.SECRET_KEY || 'secret'

  // check if headers have got a token
  if (!token){
    return res.status(401).json({
    error: "authorization token missing"
    });
  };

  // decode token and if there are errors catch them
  try{
    let token = req.headers.authorization
    let payload = jwt.verify(token, secret)
    req.userData = payload
    next()
  }catch(err){
    return res.status(401).json({
      error: err
    })
  }
}

module.exports = checkToken