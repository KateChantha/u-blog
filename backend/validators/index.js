const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);

    // if there is error message
    if (!errors.isEmpty()) {
      //422 (Unprocessable Entity) 
      return res.status(422).json({ error: errors.array()[0].msg });
    }
    next();
};