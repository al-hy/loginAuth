const jsonWebToken = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');


//The auth checker middleware function

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(400).end();
  }

  //get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  //decode the token using a secret key-phrase
  return jsonWebToken.verify(token, config.jsonwebtoken, (err, decoded) => {
    //the 401 code is for unauthorized status
    if(err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    return User.findById(userId, (userErr, user) => {
      if(userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
}
