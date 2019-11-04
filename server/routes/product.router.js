const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { create, productById, read } = require('../controllers/product.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');


// USER ROUTES
router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

// anytime userId is in the route, router.param
// gets activated. 
router.param('userId', userById)
router.param('productId', productById)




module.exports = router