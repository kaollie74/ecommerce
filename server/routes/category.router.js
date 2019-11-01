const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { create } = require('../controllers/category.controller');


// USER ROUTES
router.post('/category/create', create);




module.exports = router