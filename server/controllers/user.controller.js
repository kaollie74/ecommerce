 const User = require('../models/user.model');
 
 const signup = (req, res) => {

  //console.log('req.body', req.body);

  const user = new User(req.body);

  user.save()
  .then(response => {
    res.status(200).json(response);
  })
  .catch( error => {
    console.log(`error:`, error)
    res.status(500).json({
      error
    })
  })

//   user.save(( err, user) => {
//     if(err) {
//       return res.status(400).json({
//         err
//       })
//     }
//     res.json({
//       user
//     });
//   })

 } // END SIGNUP

// wouldn't initially work when I had just 'sayHi'
// because i need to export it as an object. 
module.exports = {signup};