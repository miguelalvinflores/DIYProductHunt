var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product, Comment } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { requireAuth, restoreUser } = require('../auth');
const {Sequelize} = require('sequelize')

router.get('/', restoreUser, asyncHandler( async(req, res) => {
    const products = await Product.findAll({ order: [["createdAt", "DESC"]], limit: 10, include: User})
    res.render('products', { title: 'Products', products, req})
}))

router.get('/:id(\\d+$\)', restoreUser,asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const product = await Product.findByPk(id,
        {include: Comment}
    )
    const comments = await Comment.findAll({

        where: {productId : id},
        include: User
    })
    const creator = await User.findOne({where: { id: product.userId }});
    const creatorProducts = await Product.findAndCountAll({where: { userId: product.userId }})


    if (res.locals.authenticated) {
        const userId  = req.session.auth.userId
        const user = await User.findByPk(userId)
        res.render('product-listing', { title: `${product.name}`, product, comments, creator, creatorProducts, user, req})
    } else {
        const user = "Please sign in to comment"
        res.render('product-listing', { title: `${product.name}`, product, comments, creator, creatorProducts, user, req})
    }


}))

router.get('/new-product', csrfProtection, restoreUser, requireAuth, asyncHandler( async(req, res) => {
    const product = await Product.build();
    res.render('new-product', {
        title: "Launch New Product",
        product,
        csrfToken: req.csrfToken(), 
        req
    })
}));
const productValidators = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a product name')
        .isLength({ max: 60 })
        .withMessage("Product name must be 60 characters or less."),
    check("photoURL")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image URL")
        .matches(/^.+[jpe?g png svg]$/)
        .withMessage("Must be a link to a valid file format (.jpg, .png, .svg)."),
    check("summary")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a product summary.')
        .isLength({ max: 200 })
        .withMessage("Summary must be 200 characters or less."),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a product description.'),
]

router.post('/new-product', productValidators, restoreUser, requireAuth, csrfProtection, asyncHandler( async( req, res) => {
    const{
        name,
        photoURL,
        summary,
        description
    } = req.body

    const product = Product.build({
        name,
        photoURL,
        summary,
        description,
    });

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()) {
        if (res.locals.authenticated) {
            const { userId } = req.session.auth
            product.userId = userId
            const newProduct = await product.save();
            res.redirect(`/products/${newProduct.id}`)
        } else {
            let errors = ["Cannot create Product launch without associated account, please sign in, or create an account <a href='/users/login'> Click Here to Login.</a>"]
            const user = await User.build();
            res.render('new-product', {
                title: "Launch Product",
                user,
                errors,
                csrfToken: req.csrfToken(), 
                req
            })
        }
    } else{
        const errors = validatorErrors.array().map((error) => {
            return error.msg
        })

        res.render('new-product', {
            title: "Launch Product",
            product,
            errors,
            csrfToken: req.csrfToken(), 
            req
        })
    }


}))

router.post('/:id(\\d+$\)', restoreUser, requireAuth, asyncHandler(async(req, res) => {
    const productId = parseInt(req.params.id, 10);

    const product = await Product.findByPk(productId, {
         include: User
    });

    const content = req.body.content
    const userId = req.session.auth.userId
    const user = await User.findByPk(userId)
    const newComment = await Comment.create({
        content,
        userId,
        productId,
    });
    res.json({newComment, user })
    console.log('NEW COMMENT', newComment)


}))

router.post('/load', asyncHandler( async(req, res) => {
    const {offset} = req.body
    const products = await Product.findAll({ order: [["createdAt", "DESC"]], limit: 10, offset, include: User })
    res.json({products})
}))

module.exports = router;
