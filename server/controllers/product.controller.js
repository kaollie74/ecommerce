const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');
const Product = require('../models/product.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

const create = (req, res) => {

 let form = new formidable.IncomingForm();
 form.keepExtensions = true; 
 form.parse(req, (error, fields, files ) => {

    // if error return json message which will stop the 
    // rest of the function from running.
    if(error) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      }) // END res.status
    } // END if

    let product = new Product(fields)
    console.log("Product: ", product);
    // .photo is how it is sent from the client side
    // if called 'image' it will be files.image instead. 
    if(files.photo) {
      product.photo.data = fs.readFileSynce(files.photo.path)
      console.log('product.photo.data: ', product.photo.data);
      product.photo.contentType= files.photo.type
      console.log("product.photo.contentType: ", product.photo.contentType);
    }

    product.save((error, result) => {
      if(error) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result)
    })

 }) // END form.parse


} // END create

module.exports = { create } 