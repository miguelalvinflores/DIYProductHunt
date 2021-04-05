var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { User } = require('../db/models')
const {check, validationResult } = require('express-validator')

/* GET users listing. */
router.get('/signup', csrfProtection, asyncHandler(async(req, res, next) => {
  const user = await User.build();
  res.render("user-signup", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken()
  })
}));
const userValidators = [
  check("emailAddress")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email')
    .isLength({ max: 100 })
    .withMessage("Email must be 100 characters or less.")
    .custom( (value) => {
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
    .custom( (value) => {
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
    .matches(/^.+[jpg png svg]$/)
    .withMessage("Must be a link to a valid file format (.jpg, .png, .svg)."),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
];


router.post('/signup', csrfProtection, userValidators, asyncHandler( async(req, res) => {
  const {firstName, lastName, userName, emailAddress, profilePicURL, password} = req.body;

  const user = User.build({
    firstName,
    lastName,
    userName,
    emailAddress,
    profilePicURL
  });

  const validatorErrors = validationResult(req);
  console.log("Verrors", validatorErrors);

  if(validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPW = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => {
      return error.msg

    });
    console.log("errors", errors);
    res.render('user-signup', {
      title: "Sign Up",
      user,
      errors,
      csrfToken: req.csrfToken()
    })
  }

}))







module.exports = router;
