
const User = require("../models/user.model");


const userById = (req, res, next, id) => {

  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    } // END if
    req.profile = user;

    next();

  }) // END User.findById
  
} // END userById


module.exports = { userById };