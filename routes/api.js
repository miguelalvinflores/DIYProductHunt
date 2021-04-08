var express = require('express');
var router = express.Router();
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
        .withMessage("Email must be 100 characters or less.")
        .custom((value) => {
            return User.findOne({ where: { emailAddress: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('This email address is already in use, please provide another.')
                    }
                });
        }),
    check("userName")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username')
        .isLength({ max: 25 })
        .withMessage("Username must be 25 characters or less.")
        .custom((value) => {
            return User.findOne({ where: { userName: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('This username already exist!!')
                    }
                });
        }),
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
        console.log('1')
        const validatorErrors = validationResult(req);
        const errors = [];
        if (validatorErrors.isEmpty()) {
            console.log('2')
            const id = parseInt(req.params.id, 10);
            const user = await User.findOne({ where: { id } });
            if(user) {
                console.log('3')
                const {
                    firstName,
                    lastName,
                    userName,
                    emailAddress,
                    profilePicURL
                } = req.body;


                const passwordMatch = await bcrypt.compare(password, user.hashedPW.toString());

                if (passwordMatch) {
                    console.log('4')
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.userName = userName;
                    user.emailAddress = emailAddress;
                    user.profilePicURL = profilePicURL;
                    await user.save();
                } else {
                    errors.push('That password does not match our records.')
                }
            } else {
                res.redirect('/users/login')
                res.render('user-profile', { title: `${user.firstName}`, errors, csrfToken: req.csrfToken() })
            }
        } else {
            errors.push(validatorErrors.array().map((error) => error.msg));
        }

        res.render('user-profile', { title: `${user.firstName}`, errors, csrfToken: req.csrfToken() })
    }
    ))


module.exports = router;
