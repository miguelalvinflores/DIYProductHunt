var express = require('express');
var router = express.Router();
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');


router.get('/', restoreUser, (req,res) => {
    res.render('about', {title: 'About', req})
})


module.exports = router;
