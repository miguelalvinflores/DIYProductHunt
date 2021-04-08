var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');

const userValidators = [
    check("emailAddress")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email')
        .isLength({ max: 100 })
        .withMessage("Email must be 100 characters or less."),
    check("userName")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username')
        .isLength({ max: 25 })
        .withMessage("Username must be 25 characters or less."),
    check("firstName")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a First mame.')
        .isLength({ max: 30 })
        .withMessage("First name must be 30 characters or less."),
    check("lastName")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a Last mame.')
        .isLength({ max: 30 })
        .withMessage("Last name must be 30 characters or less."),
    check("profilePicURL")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image URL")
        .matches(/^.+[jpe?g png svg]$/)
        .withMessage("Must be a link to a valid file format (.jpg, .png, .svg)."),
];

router.put('/users/:id(\\d+$\)', userValidators,
    asyncHandler( async( req, res) => {
        const validatorErrors = validationResult(req);
        const errors = [];
        if (validatorErrors.isEmpty()) {
            const id = parseInt(req.params.id, 10);
            const user = await User.findOne({ where: { id } });
            if(user) {
                const {
                    firstName,
                    lastName,
                    userName,
                    emailAddress,
                    profilePicURL,
                    password
                } = req.body;


                const passwordMatch = await bcrypt.compare(password, user.hashedPW.toString());
                console.log(passwordMatch)

                if (passwordMatch) {
                    const updatedUser = await user.update({
                        firstName,
                        lastName,
                        userName,
                        emailAddress,
                        profilePicURL
                    });
                    console.log(updatedUser)
                    res.json({user})
                } else {
                    errors.push('That password does not match our records.')
                    res.json({errors})
                }
            } else {
                res.redirect('/users/login')
                res.render('user-profile', { title: `${user.firstName}`, errors, csrfToken: req.csrfToken() })
            }
        } else {
            errors.push(validatorErrors.array().map((error) => error.msg));
        }

        // res.render('user-profile', { title: `${user.firstName}`, errors, csrfToken: req.csrfToken() })
    }
    ))


module.exports = router;
