var express = require('express');
var router = express.Router();
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');
const {csrfProtection} = require('./utils')

router.get('/', csrfProtection, restoreUser, (req,res) => {
    res.render('about', {title: 'About', csrfToken: req.csrfToken(), req})
})


module.exports = router;
