const User = require('../models/user.model');
const jwt = require('jsonwebtoken'); // used to generate signed token
const expressJwt = require('express-jwt') // use to check authorization
const { errorHandler } = require('../helpers/dbErrorHandler');
require('dotenv').config();


const signup = (req, res) => {

  //console.log('req.body', req.body);

  const user = new User(req.body);

  user.save()
    .then(response => {

      // set salt key to undefined so it is removed 
      // from the 'response' object.
      response.salt = undefined;
      // set hashed_password to undefined
      // so it it removed from the 'response' object.
      response.hashed_password = undefined;
      res.status(200).json(response);

    })
    .catch(error => {
      console.log(`error:`, error)
      res.status(500).json({

        // error from the Db is passed into the errorHandler function
        // which is imported from 'dbErrorHandler.js'
        error: errorHandler(error)
      })
    })


} // END SIGNUP

const signin = (req, res) => {
  // find user based on email
  const { email, password } = req.body // deconstructuring req.body
  User.findOne({ email }, (error, user) => {

    if (error || !user) {
      return res.status(400).json({
        error: "user with that email does not exist. Please signup."
      }) // END JSON

    } // END IF

    // If user is found make sure th email and password match
    // create authenticat method in user model
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match"
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 })
    // return response with user and tokedn to frontend client
    const { _id, name, email, role } = user // deconstructuring user body
    return res.json({
      
      token, user: { _id, email, name, role }
    });

  }) // END User.findOne

} // END SIGNIN

const signout = (req, res) => {

  res.clearCookie('t');
  res.json({message: "Signout Success"});

}// END SIGNOUT

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
})







// wouldn't initially work when I had just 'sayHi'
// because i need to export it as an object. 
module.exports = { 
  signup, 
  signin, 
  signout, 
  requireSignin 
};