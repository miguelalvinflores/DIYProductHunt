var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product } = require('../db/models')
const { check, validationResult } = require('express-validator');

router.get('/new-product', csrfProtection, asyncHandler( async(req, res) => {
    const product = await Product.build();
    res.render('new-product', { 
        title: "Launch New Product",
        product,
        csrfToken: req.csrfToken()
    })
}))

module.exports = router;

