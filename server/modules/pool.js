const mg = require('mongoose');
require('dotenv').config();
const Mongoose = mg.Mongoose;

//db
const mongoose = Mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then( () => {
  console.log('DB connected')
})

module.exports = mongoose; 