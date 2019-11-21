
const User = require("../models/user.model");

/************************************************************ userById ******************************** */

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
/************************************************************ userRead ******************************** */
const userRead = (req, res) => {

  req.profile.hashed_password = undefined; // by setting it undefined, it will not return in the json response 'req.profile';
  req.profile.salt = undefined;            // by setting it undefined, it will not return in the json response 'req.profile';

  return res.json(req.profile);

} // END userRead

/************************************************************ userUpdate ******************************** */
// find user by using the id in req.profile using the fineOneAndUpdate() method
// set new information that comes in the req.body
const userUpdate = (req, res) => {

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {

      if (err) {

        return res.status(400).json({
          error: "You are not authorized to perform this action"
        });
      }
      console.log("USER>>>>>>>>>>>>>>>",user)
      user.hashed_password = undefined; // by setting to undefined, it will not return in the json response
      user.salt = undefined;            // by setting to undefined, it will not return in the json response
      res.json(user);
    } // END CALLBACK

  ); // END User.findOneAndUpdate

} // END userUpdate



module.exports = { userById, userRead, userUpdate };