const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//app
const app = express();


app.use(express.static('build'));

// import routes
const userRouter = require('./routes/user');

//routes
app.use('/user', userRouter);



//db connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then( () => {
  console.log('DB connected')
})






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})