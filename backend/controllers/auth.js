const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

/**
 * step 1. find user in db
 * step 2. check if user exist
 * step 3. if user Not,then store req.body in db
 * step 4. response message to client either suceess or error
 */
exports.signup = (req, res) => {
  
  User.findOne({ eamil: req.body.email }).exec((err, user) => {
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

/**
 * step 1. check if user exist by email
 * step 2. authenticate with password
 * step 3. generate token(includes userid and secret) and send to client
 * step 4. reponse to client with user info and token
 */
exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User with that email does not exist. Please signup.'
          });
      }
      // authenticate
      if (!user.authenticate(password)) {
          return res.status(400).json({
              error: 'Email and password do not match.'
          });
      }
      // generate a token and send to client
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.cookie('token', token, { expiresIn: '1d' });
      const { _id, username, name, email, role } = user;
      return res.json({
          token,
          user: { _id, username, name, email, role }
      });
  });
};

/**
 * step 1. clear cookies
 * step 2. reponse to client with message
 */
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
      message: 'Signout success'
  });
};

/**
 * Middle ware to be apply to any protected route route 
 * step 2. compare with secret that is in .env file
 * step 3. expressJwt give UnauthorizedError: No authorization token was found
 */
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user
  algorithms: ["HS256"], // added later
  userProperty: "user" // match name property in get/secret 
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }
      // make user data available in property name 'profile'
      req.profile = user;
      next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }

      // admin role is 1
      if (user.role !== 1) {
          return res.status(400).json({
              error: 'Admin resource. Access denied'
          });
      }

      req.profile = user;
      next();
  });
};
