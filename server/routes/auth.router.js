const express = require('express');
const router = express.Router();

// IMPORTING MIDDLEWARE
const { userSignupValidator } = require('../validator/index.validator');

// IMPORTING CONTROLLERS
const { signup, signin, signout, requireSignin } = require('../controllers/auth.controller');


// USER ROUTES
router.post('/signup', userSignupValidator,  signup);
router.post('/signin', signin)
router.get('/signout', signout)



module.exports = router