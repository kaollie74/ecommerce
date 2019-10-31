const User = require('../models/user.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

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

  //   user.save(( err, user) => {
  //     if(err) {
  //       return res.status(400).json({
  //         err
  //       })
  //     }
  //     res.json({
  //       user
  //     });
  //   })

} // END SIGNUP

// wouldn't initially work when I had just 'sayHi'
// because i need to export it as an object. 
module.exports = { signup };