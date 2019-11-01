const express = require('express');
const router = express.Router();

// IMPORTING MIDDLEWARE
const { userSignupValidator } = require('../validator/index.validator');

// IMPORTING CONTROLLERS
const { signup, signin, signout } = require('../controllers/user.controller');


// USER ROUTES
router.post('/signup', userSignupValidator,  signup);
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router