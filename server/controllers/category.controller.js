const Category = require('../models/category.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

const categoryById = (req, res, next, id ) => {

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

  const category = new Category(req.body);

  category.save((error, data) => {

    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      })
    } // END if
    res.json({ data })
  }) // END category.save()
} // END create


const categoryRead = (req, res) => {

  return res.json(req.category);

}

module.exports = { create, categoryById, categoryRead } 