const Category = require('../models/category.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

const categoryById = (req, res, next, id) => {

  Category.findById(id).exec((error, category) => {

    if (error || !category) {
      return res.status(400).json({
        error: "Category does not exist"
      })
    } // END IF

    req.category = category;

    next();
  })  // END Category.findById
} // END categoryById

const create = (req, res) => {

  console.log("Hello this is req.body" , req.body)

  const category = new Category(req.body);

  category.save((error, data) => {

    if (error) {
      // return res.status(400).json({
      //   error: errorHandler(error)
      // })
      return res.send( {errors: errorHandler(error)})
    } // END if
    
    res.json({ data })
  }) // END category.save()
} // END create


const categoryRead = (req, res) => {

  return res.json(req.category);

} // END categoryRead

const categoryUpdate = (req, res) => {

  const category = req.category;
  category.name = req.body.name;

  category.save((error, data) => {

    if (error) {
      return res.status(400).json({

        error: errorHandler(error)

      })
    } // END if(error)

    res.json(data)

  }) // END category.save()

} // END categoryUpdate

const categoryDelete = (req, res) => {

  const category = req.category;
 

  category.remove((error, data) => {

    if (error) {
      return res.status(400).json({

        error: errorHandler(error),
        message: "Unable to delete category"

      })
    } // END if(error)

    res.json({
      message: "Category deleted"
    })

  }) // END category.save()

} // END categoryDelete

const categoryList = (req, res) => {

  Category.find().exec((error, data) => {

    if (error) {
      return res.status(400).json({

        error: errorHandler(error),
        message: "Unable to retrieve list of categories"

      })
    } // END if(error)

    // if no errors, this will send the list of categories
    res.json(data);
  })
} // END list

module.exports = { create, categoryById, categoryRead, categoryUpdate, categoryDelete, categoryList } 