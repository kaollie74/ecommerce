const express = require('express');
const router = express.Router();

// IMPORTING MIDDLEWARE
const { userSignupValidator } = require('../validator/index.validator');

// IMPORTING CONTROLLERS
const { signup, signin } = require('../controllers/user.controller');


// USER ROUTES
router.post('/signup', userSignupValidator,  signup);
router.post('/signin', signin)

module.exports = router