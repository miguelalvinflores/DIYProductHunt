var express = require('express');
var router = express.Router();
const {csrfProtection} = require("./utils")
/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
  const pugFile = "index"
  res.render('index', { title: 'Home', pugFile, csrfToken: req.csrfToken(), req });
});

module.exports = router;
