const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

require('dotenv').config();

//app
const app = express();


app.use(express.static('build'));

// IMPORTED ROUTES
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const categoryRouter = require('./routes/category.router');
const productRouter = require('./routes/product.router');

// MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// ROUTES MIDDLEWARE
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);



// DATABSE CONNECTION
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('DB connected')
})







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})