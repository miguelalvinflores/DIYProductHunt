var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');

router.put('/users/:id(\^\d+$\)', restoreUser. requireAuth,
    asyncHandler( async( req, res) => {
        const id = parseInt(req.params.id, 10);
        const user = await User.findOne({ where: { id } });
        if(user) {
            const {
                firstName,
                lastName,
                userName,
                emailAddress,
                profilePicURL,
            } = req.body;
        }
    }
) )


module.exports = router;
