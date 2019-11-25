const User = require('../models/user.model');
const jwt = require('jsonwebtoken'); // used to generate signed token
const expressJwt = require('express-jwt') // use to check authorization
const { errorHandler } = require('../helpers/dbErrorHandler');
require('dotenv').config();

/*********************************** SIGN UP ROUTE ****************************************************/
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
      res.send({errors: errorHandler(error)})
      // res.status(500).json({

      //   // error from the Db is passed into the errorHandler function
      //   // which is imported from 'dbErrorHandler.js'
      //   error: errorHandler(error)
      // })
    })


} // END SIGNUP

/*********************************** SIGN IN ROUTE ****************************************************/
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

/*********************************** SIGN OUT ROUTE ****************************************************/
const signout = (req, res) => {

  res.clearCookie('t');
  res.json({message: "Signout Success"});

}// END SIGNOUT

/*********************************** REQUIRE SIGN IN METHOD ****************************************************/
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth" // adding auth as user property
})

/*********************************** IS AUTHORIZATION METHOD ****************************************************/
const isAuth = (req, res, next) => {

  // if we have a user that returns true, we can authorize using this comparison
  let user = req.profile && req.auth && req.profile._id == req.auth._id

  if(!user) {
    return res.status(403).json({
      error: "Access denied"
    })
  } // end if

  next(); 
} // END isAuth

/*********************************** IS ADMINISTRATOR METHOD ****************************************************/
isAdmin = (req, res, next) => {

  // 0 means that it is a user and not admin
  // 1 will mean that the user is the admin
  if(req.profile.role === 0 ) {
    return res.status(403).json({
      error: "Request denied, must be Admin"
    })
  }// END IF

  next();
} // END isAdmin







// wouldn't initially work when I had just 'sayHi'
// because i need to export it as an object. 
module.exports = { 
  signup, 
  signin, 
  signout, 
  requireSignin,
  isAuth, 
  isAdmin
};