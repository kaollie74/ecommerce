const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { create, categoryById, categoryRead, categoryUpdate, categoryDelete, categoryList } = require('../controllers/category.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');


// USER ROUTES
router.get('/category/:categoryId', categoryRead)
router.get('/category', categoryList);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, categoryUpdate);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, categoryDelete);




// anytime userId or categoryId is in the route, router.param
// gets activated. 
router.param('userId', userById)
router.param('categoryId', categoryById)




module.exports = router