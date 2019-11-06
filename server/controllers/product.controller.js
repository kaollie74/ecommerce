const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');
const Product = require('../models/product.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

/*********************** PRODUCT BY ID ******************************************* */
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

/*********************** READ ********************************************************/
const productRead = (req, res) => {

  // set photo property to undefinded which will
  // prevent being sent back in the request.
  // Retrieving the photo will be handled differently
  // to keep things efficient. 
  req.product.photo = undefined;
  return res.json(req.product);

} // END read

/*********************** CREATE********************************************************/
const create = (req, res) => {

  console.log('In product controller create:', req.product);

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {

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

    // make sure every field is filled. 
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "All fields are required"
      })
    } // END IF

    // create new product.
    let product = new Product(fields)


    // 1kb = 1000;
    // 1mb = 1,000,000
    // .photo is how it is sent from the client side
    // if called 'image' it will be files.image instead. 
    if (files.photo) {

      // check photo size. if over 1 MB,
      //return an error message. 
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        })
      } // END if (files.photo.size > 1000000)

      product.photo.data = fs.readFileSync(files.photo.path)
      //console.log('product.photo.data: ', product.photo.data);
      product.photo.contentType = files.photo.type
      //console.log("product.photo.contentType: ", product.photo.contentType);

    } // END if(files.photo)

    // save data to new product schema,
    // if all conditions are met. 
    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      } // END if(error)
      res.json(result)

    }) // END product.save()

  }) // END form.parse

} // END create

/*********************** REMOVE PRODUCT ************************************************************/
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

const updateProduct = (req, res) => {

  console.log('In product controller create:', req.product);

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {

    // if error return json message which will stop the 
    // rest of the function from running.
    if (error) {

      return res.status(400).json({
        error: "Image could not be uploaded"

      }) // END res.status

    } // END if

    // check for all fields 
    // grab property from fields object 
    const { name, description, price, category, quantity, shipping } = fields;

    // make sure every field is filled. 
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "All fields are required"
      })
    } // END IF

    // update req.product, set it to product.
    let product = req.product;
    // take two args
    // existing 'product'
    // updated 'fields'
    product = _.extend(product, fields);


    // 1kb = 1000;
    // 1mb = 1,000,000
    // .photo is how it is sent from the client side
    // if called 'image' it will be files.image instead. 
    if (files.photo) {

      // check photo size. if over 1 MB,
      //return an error message. 
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        })
      } // END if (files.photo.size > 1000000)

      product.photo.data = fs.readFileSync(files.photo.path)
      //console.log('product.photo.data: ', product.photo.data);
      product.photo.contentType = files.photo.type
      //console.log("product.photo.contentType: ", product.photo.contentType);

    } // END if(files.photo)

    // save data to new product schema,
    // if all conditions are met. 
    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      } // END if(error)
      res.json(result)

    }) // END product.save()

  }) // END form.parse

} // END updateProduct

// Return product base on "Sell" and "Arrival"
// return product by sell = /products?sortBy=sold&order=desc&limit=4
// return product by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, then all products are returned
const productList = (req, res) => {

  // ternary conditions
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? req.query.limit : 6;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((error, products) => {

      if (error) {
        return res.status(400).json({
          error: "Products not found"
        })
      } // END if(error)
      res.send(products);
    })
} // END productList()

module.exports = {
  create,
  productById,
  productRead,
  removeProduct,
  updateProduct,
  productList
}; 