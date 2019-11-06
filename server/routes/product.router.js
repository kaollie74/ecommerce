const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { create, productById, productRead, removeProduct, updateProduct, productList } = require('../controllers/product.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');



// USER ROUTES
router.get('/product/:productId', productRead)
router.get('/products', productList)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, removeProduct );
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct);

// anytime userId is in the route, router.param
// gets activated. 
router.param('userId', userById)
router.param('productId', productById)




module.exports = router