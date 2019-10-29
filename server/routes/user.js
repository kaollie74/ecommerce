const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('hello from user.js router /get');
})

module.exports = router