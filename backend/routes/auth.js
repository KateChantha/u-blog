const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin } = require('../controllers/auth')

// validators
const { runValidation } = require('../validators');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');


router.post('/signup',userSignupValidator, runValidation, signup);
router.post('/signin',userSigninValidator, runValidation, signin);
router.get('/signout', signout);
// test requireSignin
router.get('/secret', requireSignin, (req,res)=> {
  // res.json({ message: 'you have access to a secret page'})
  // res.json({ user: req.user})
  res.json({ user: req.auth}) // match name property in requireSignin
});

module.exports = router;