var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product, Comment } = require('../db/models')
const {check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');
const bcrypt = require('bcryptjs')

router.get('/demo-login', csrfProtection, asyncHandler(async (req,res) => {
  const demoUser = await User.findByPk(1);
  loginUser(req, res, demoUser);
  res.redirect('/products');
}))

router.get('/:id(\\d+$\)', csrfProtection, restoreUser, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const user = await User.findOne({
    where: { id},
    include: {
      model: Product
    }
  });
  const date = user.createdAt.toLocaleDateString(undefined)
  res.render('user-profile', { title: `${user.firstName}`, user, date, req, csrfToken: req.csrfToken() })
}));

router.post('/:id(\\d+\)/delete', csrfProtection, restoreUser, asyncHandler(async (req, res) => {

  const { userIdDelete, passwordDelete } = req.body;
  console.log(userIdDelete)

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    console.log(2)
    const user = await User.findOne({
      where: { id: userIdDelete },
      include: {
        model: Product
      }
    });

    if(user) {
      console.log(3)
      const passwordMatch = await bcrypt.compare(passwordDelete, user.hashedPW.toString())
      if (passwordMatch) {
        await Comment.destroy({where: { userId: userIdDelete }});
        await Product.destroy({where: { userId: userIdDelete }});
        logoutUser(req, res)
        await user.destroy();
        res.redirect('/')
      } else {
        errors.push('Profile was not deleted because the password you provided did not match our records')
        const date = user.createdAt.toLocaleDateString(undefined)
        res.render('user-profile', { title: `${user.firstName}`, user, date, errors, req, csrfToken: req.csrfToken() })

      }
    } else {
      res.redirect('/');

    }

  }
}))

/* GET users listing. */
router.get('/signup', csrfProtection, asyncHandler(async(req, res, next) => {
  const user = await User.build();
  res.render("user-signup", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken(),
    req
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
    .matches(/^.+[jpe?g png svg]$/)
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
    res.render('user-signup', {
      title: "Sign Up",
      user,
      errors,
      csrfToken: req.csrfToken(),
      req
    })
  }

}))

router.get('/login', csrfProtection, asyncHandler( async(req, res, next) => {
  res.render('user-login', { title: "Login", csrfToken: req.csrfToken(), req})
}))

const loginValidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username')
    .custom((value) => {
      return User.findOne({ where: { userName: value } })
        .then((user) => {
          if (!user) {
            return Promise.reject('There is no user with that username, click "Sign Up" in the navigation menu to register for an account.')
          }
          return true;
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
];

router.post('/login', loginValidators, csrfProtection, asyncHandler( async(req, res, next) => {
  const { userName, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { userName }})

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPW.toString());

      if (passwordMatch) {
        loginUser(req, res, user)
        return res.redirect('/')
      }

    }
    errors.push('That password/username combination does not match our records.')
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('user-login', { title: "login", userName, errors, csrfToken: req.csrfToken(), req})
}))

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/')
})




module.exports = router;
