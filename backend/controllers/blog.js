const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable'); // because we not dealing with Json data to creating blog and we also tranfering file(image data).
const slugify = require('slugify'); // to generate slug from blog
const stripHtml = require('string-strip-html'); // to help generate an excerp out of blog
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const { smartTrim } = require('../helpers/blog');

exports.create = (req, res) => {
  // step 1. use fromidable to handle req.body
  // keep original file extention (zip, gif, etc)
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // step 2. use formidable to parse req data to in to feilds
  form.parse(req, (err, fields, files) => {
    // Handle error
    if (err)  return res.status(400).json({error: 'Image could not upload'});

    // step 2.1 HANDLE FEILD - destructure fields object
    const { title, body, categories, tags } = fields;

    let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.excerpt = smartTrim(body, 320, ' ', ' ...');
        blog.slug = slugify(title).toLowerCase();
        blog.mtitle = `${title} | ${process.env.APP_NAME}`;
        blog.mdesc = stripHtml(body.substring(0, 160)).result;
        blog.postedBy = req.user._id;

    // step 2.2 HANDLE FILES
    if (files.photo) {
      if (files.photo.size > 10000000) {
          return res.status(400).json({
              error: 'Image should be less then 1mb in size'
          });
      }
    
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    // step 2.3 SAVE BLOG IN DATABASE
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
            // this error coming form MongDB
            // so, we can handle it with errorHandle that we have
            error: errorHandler(err) 
        });
        // if successful
        res.json(result);
      }


    });


  });

}