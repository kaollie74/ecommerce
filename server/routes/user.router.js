const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { userById } = require('../controllers/user.controller');
const { requireSignin } = require('../controllers/auth.controller');


// USER ROUTES
router.param('userId', userById)// anytime there is a userId in the routes, this will run

router.get('/secret/:userId', requireSignin, (req, res) => {
  res.json({
    user: req.profile
  })
})



module.exports = router