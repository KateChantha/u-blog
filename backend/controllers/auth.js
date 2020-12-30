const User = require('../models/user');
const shortId = require('shortid');

exports.signup = (req, res) => {

  // step 1. find user in db
  User.findOne({ eamil: req.body.email }).exec((err, user) => {
    // step 2. if usser already exist in db
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      })
    }

  //step 3. if user Not,then store in db
  const { name, email, password } = req.body;
  
  // shortid package to generate a unique id that used in URL
  let username = shortId.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;

  let newUser = new User({ name, email, password, profile, username });
  newUser.save((err, success) => {
    if (err) {
        return res.status(400).json({
            error: err
        });
    }
    // res.json({
    //     user: success
    // });
    res.json({
        message: 'Signup success! Please signin.'
    });
  });
})
}