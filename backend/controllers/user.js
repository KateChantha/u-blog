const User = require('../models/user');

exports.read = (req, res) => {
  // overide to undfined before response back
  req.profile.hashed_password = undefined;
  return res.json(req.profile)
}
