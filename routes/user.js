var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');

/* GET users listing. */
router.get('/signup', csrfProtection, asyncHandler(async(req, res, next) => {
  const user = await db.User.build();
  res.render("user-signup", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken()
  })

}));

module.exports = router;
