const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');
const Product = require('../models/product.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

const productById = (req, res, next, id) => {

  Product.findById(id).exec((error, product) => {

    if (error || !product) {
      return res.status(400).json({
        error: "Product not found"
      })
    }  // END if
    req.product = product;
    next();

  }) // END Product.findById().

} // END productById.

const read = (req, res) => {

  // set photo property to undefinded which will
  // prevent being sent back in the request
  // the retrieving the photo will be handled differently
  // to keep things efficient. 
  req.product.photo = undefined;
  return res.json(req.product);

} // END read

const create = (req, res) => {
  console.log('In product controller create:', req.product);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, ( error, fields, files) => {

    // if error return json message which will stop the 
    // rest of the function from running.
    if (error) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      }) // END res.status
    } // END if

    // check for all fields 
    // destructuring fields object. 
    const { name, description, price, category, quantity, shipping } = fields;
    // make sure every field are filled. 
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "All fields are required"
      })
    }
    // create new product.
    let product = new Product(fields)


    // 1kb = 1000;
    // 1mb = 1,000,000
    // .photo is how it is sent from the client side
    // if called 'image' it will be files.image instead. 
    if (files.photo) {

      // check photo size. if over 1mb,
      //return an error message. 
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        })
      } //END IF
      product.photo.data = fs.readFileSync(files.photo.path)
      //console.log('product.photo.data: ', product.photo.data);
      product.photo.contentType = files.photo.type
      //console.log("product.photo.contentType: ", product.photo.contentType);

    } // END IF(FILES.PHOTO)

    // save data to new product schema
    // if all conditions are met. 
    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result)
    })

  }) // END form.parse

} // END create

const removeProduct = (req, res) => {

  // get product info from the request
  let product = req.product
  product.remove((error, deletedProduct) => {

    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      })
    } // END IF

    res.json({
      "message": "Product deleted Successfully"
    })
  })

} // END removeProduct

module.exports = { create, productById, read, removeProduct }; 