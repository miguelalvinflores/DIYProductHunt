var express = require('express');
var router = express.Router();
const {csrfProtection} = require("./utils")
/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
  res.render('index', { title: 'Home', csrfToken: req.csrfToken(), req });
});

module.exports = router;
