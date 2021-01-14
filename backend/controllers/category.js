const Category = require('../models/category');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
  const {name} = req.body;
  const slug = slugify(name).toLowerCase();

  let category = new Category({name,slug});

  category.save((err, data) => {
    if(err) {
      return res.status(400).json({
        // error: err.errmsg
        error: errorHandler(err)
      })
    }
    // this reponse data is categoy.data
    res.json(data)
  });
}

/**
 * GET all categories
 */
exports.list = (req, res) => {
  // {} will return everything
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }

    res.json(data);
  })
}

/**
 * GET single category
 */
exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase()

  Category.findOne({slug}).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }

    res.json(category);
  })
}

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({slug}).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }

    res.json({
      message: 'Category deleted successfully'
    });
  })
}