const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { create } = require('../controllers/product.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');


// USER ROUTES
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

// anytime userId is in the route, router.param
// gets activated. 
router.param('userId', userById)




module.exports = router