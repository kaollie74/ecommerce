
const userSignupValidator = (req, res, next) => {

  // checks the 'name' key  to make sure it is not empty
  req.check('name', 'Name is required').notEmpty();

  // Check email key
  // check if it has @ by using 'matches()' method
  // checks length by using 'isLength()' method
  req.check('email', 'Email must be between 3 to 32 characters')

    //.matches(/.+\@.+\..+/) // check for the @ symbol in email
    .matches('@') // checks for @ symbol in email
    .withMessage('Email must contain @') 
    .isLength({ // set params of email length
      min: 4,
      max: 32
    });

  // sees if password key is empty
  req.check('password', 'Password is required').notEmpty(); 
  req.check('password')
    .isLength({ // sets param for length to be at least 4.
      min: 4
    })
    .withMessage('Password must contain at least 4 characters') // sends message if error
    .matches(/\d/) // check for if the is a number in the password
    .withMessage('Password must contain a number')

    let firstError = ''; // global variable

    // grabs all errors by using 'validationErrors()' method.
    const errors = req.validationErrors();
    console.log('this are the errors', errors);
    if(errors) {
         firstError = errors.map( error => error.msg)[0];
         console.log('firstError', firstError);
         // return status and value in a json object    
         return res.status(400).json({error: firstError});
    }

    
    next();

} // end userSignupValidator

module.exports = { userSignupValidator };