var express = require('express');
var router = express.Router();
const { requireAuth, restoreUser } = require('../auth');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product, Comment } = require('../db/models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

router.post('/', restoreUser, csrfProtection, asyncHandler( async (req, res) => {
    const { search } = req.body
    const pugFile = 'index'
    if (search) {
        const products = await Product.findAll({
            where: {
                [Op.or]: {
                    name: { [Op.like]: '%' + search + '%' },
                    summary: { [Op.like]: '%' + search + '%' },
                    description: { [Op.like]: '%' + search + '%' },
                }
            },
            order: [["createdAt", "DESC"]],
            include: User
        })
        // console.log(products)
        res.render('search', { title: 'Search Results', pugFile, products, csrfToken: req.csrfToken(), req })
    } else {
        const products = [];
        res.render('search', { title: 'Search Results', pugFile, products, csrfToken: req.csrfToken(), req })
    }
}))



module.exports = router;
