const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//app
const app = express();

console.log(mongoose);
app.use(express.static('build'));

// routes
app.get('/', (req,res)=> {
  res.send('Hello from the server');
})

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