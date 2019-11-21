const express = require('express');
const router = express.Router();



// IMPORTING CONTROLLERS
const { userById, userRead, userUpdate } = require('../controllers/user.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');


// USER ROUTES
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  })
})

router.get('/user/:userId', requireSignin, isAuth, userRead);
router.put('/user/:userId', requireSignin, isAuth, userUpdate);

router.param('userId', userById)// anytime there is a userId in the routes, this will run



module.exports = router