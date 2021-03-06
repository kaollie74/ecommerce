const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');
const Product = require('../models/product.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

/*********************** productById ********************************************/
const productById = (req, res, next, id) => {

  console.log("ID>>>>>>>>>>>", id)

  Product.findById(id)
  .populate('category')
  .exec((error, product) => {

    if (error || !product) {
      // return res.status(400).json({
      //   error: "Product not found"
      // })
      return res.send({error: "Product not found"})

    }  // END if
    req.product = product;
    next();

  }) // END Product.findById().

} // END productById.

/*********************** read ********************************************************/
const productRead = (req, res) => {
  // set photo property to undefinded which will
  // prevent being sent back in the request.
  // Retrieving the photo will be handled differently
  // to keep things efficient. 
  console.log("REQ.PRODUCT>>>>>>>>>>>>>>>> ", req.product)
  req.product.photo = undefined;
  //return res.json(req.product);
  return res.send(req.product);

} // END read

/*********************** create ********************************************************/
const create = (req, res) => {

  console.log("In Product Create: ", req.body);

  let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'

            });
            //return res.send({errors: "Image could not be uploaded"})
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;
        console.log("FIELDS: ", fields);
        if (!name || !description || !price || !category || !quantity || !shipping) {
            // return res.status(400).json({
            //     error: 'All fields are required'
            // });
            return res.send({error: "All fields are required"})
        }

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
                // return res.send({errors: "Image should be less than 1mb in size"})
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
                //return res.send({errors: errorHandler(err)})
            }
            res.json(result);
            //res.send(result)
        });
    });


} // END create

/***********************  removeProduct  ************************************************************/
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

/** ****************************** updateProduct ********************************************************************/
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

/** ****************************** productList *****************************************************************/

// Return product base on "Sell" and "Arrival"
// return product by sell = /products?sortBy=sold&order=desc&limit=4
// return product by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, then all products are returned
const productList = (req, res) => {

  // ternary conditions
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  // parseInt() will convert string to number data type
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

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
      res.json(products);
    })
} // END productList()

/** ****************************** PRODUCT LIST RELATED ***********************************************************/

// it will find the product based on the 'req.product.category'
// other products that has the same category will be returned.
const productListRelated = (req, res) => {

  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  // $ne means 'not including, use this for mongoDB.
  // user will request an item based on its category
  // this will find the ones that exist in the category minus the 
  // one they selected.
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((error, products) => {

      if (error) {
        return res.status(400).json({

          error: "Product not found"

        })
      } // END if
      res.json(products)
    })

} // END productListRelated()

/******************************** productListCategories ***************************************************** */
const productListCategories = (req, res) => {

  Product.distinct("category", {}, (error, categories) => {

    if (error) {
      return res.status(400).json({
        error: "Products not found"

      })

    } // END if
    res.json(categories);

  }) // END Product.distinct()

} // END productListCategories

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

/******************************************* productListBySearch *****************************************************************/
const productListBySearch = (req, res) => {

  console.log('productListBySearch REQ.BODY: ', req.body);

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip); // returns integer
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0], //$gte needed to query MonogDB
          $lte: req.body.filters[key][1]  //$lte needed to query MonogDB
        };
      } else {
        findArgs[key] = req.body.filters[key];
      } // END else
    } // END if(req.body.filters[key].length > 0)
  } // END for in loop

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
} // END productListBySearch

// this will act as a middleware
// check to see if there is data with photo key in product object
// if there is one, set it the 'Content-Type' by using the 'set()' method. 
// return sending the photo.data
// then execute the next() method. 
const photo = (req, res, next) => {

  console.log('req.product.photo.data', req.product.photo.data)
  
  if(req.product.photo.data) {

    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
    
  } // END if

  next();
} // END photo

const productListSearch = (req,res) => {
  // create query object to hold search value and category value
  console.log(req.query);
  const query = {}
  // assign search value to query.name
  if(req.query.search){

    query.name = {$regex: req.query.search, $options: 'i'}
    console.log("query.name: ", query.name);
    
      // assign category value to query.category
      if(req.query.category && req.query.cateogry !== "All"){
        query.category = req.query.category;
      } // END IF 

      //find the product based on query object with 2 properties
      // search and category
      Product.find(query, (error, products) =>{
        if(error) {
          // return res.status(400).json({
          //   error: errorHandler(error)
          // })
          return res.send({error: errorHandler(error)})
        } // END IF 
        res.json(products)
      }).select('-photo')
  } // END IF 
} // END PRODUCT LIST SEARCH

/** ****************************** MODULE EXPORTS *************************************/
module.exports = {
  create,
  photo,
  productById,
  productRead,
  productList,
  productListBySearch,
  productListCategories,
  productListRelated,
  removeProduct,
  updateProduct,
  productListSearch

}; 