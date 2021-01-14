const express = require('express');
const router = express.Router();
const { create } = require('../controllers/category');

// validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/categories', list);
// get a sigle category access by req.params
// use slug for SEO
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);


module.exports = router;