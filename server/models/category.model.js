const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32
  },
  
}, { timestamps: true }

); // END userSchema



module.exports = mongoose.model("Category", categorySchema)