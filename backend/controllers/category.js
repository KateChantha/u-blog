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
