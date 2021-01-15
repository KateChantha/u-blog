const Tag = require('../models/tag');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
  const {name} = req.body;
  const slug = slugify(name).toLowerCase();

  let tag = new Tag({name,slug});

  tag.save((err, data) => {
    if(err) {
      return res.status(400).json({
        // error: err.errmsg
        error: errorHandler(err)
      })
    }
    // this reponse data is tag.data
    res.json(data)
  });
}

/**
 * GET all tags
 */
exports.list = (req, res) => {
  // {} will return everything
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }

    res.json(data);
  })
}

/**
 * GET single tag
 */
exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase()

  Tag.findOne({slug}).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }

    res.json(tag);
  })
}

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({slug}).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }

    res.json({
      message: 'Tag deleted successfully'
    });
  })
}