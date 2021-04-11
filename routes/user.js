var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product, Comment } = require('../db/models')
const {check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');
const bcrypt = require('bcryptjs')
const faker = require('faker')

router.get('/demo-login', csrfProtection, asyncHandler(async (req,res) => {
  const demoUser = await User.findByPk(1);
  const demoProducts = await Product.findAll({where: { userId: 1}})
  const newDemoProducts = [
    {
      name: 'Authentic Sloyd Tool Cabinet',
      photoURL: `https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/lead-glam1a-1.jpg`,
      summary: 'This reproduction is a fun build and a great gift for a budding woodworker.',
      description: '“Hand and heart lead to life.” was an early motto of the North Bennet Street Industrial School (NBIS), now called the North Bennet Street School (NBSS). Founded in 1885 by Pauline Agassiz Shaw, a progressive Boston philanthropist, the school was established to “train students for careers in traditional trades that use hand skills in concert with evolving technology, to preserve and advance craft traditions and promote greater appreciation of craftsmanship.” The school started off as a social and educational experiment designed to help residents in the North End of Boston, many of whom were immigrants, acclimate to America, learn a trade, socialize and become better citizens. In pursuit of this goal Shaw learned of Otto Salomon’s work at the Sloyd School in Naas Sweden and was instrumental in bringing Swedish Educational Sloyd to America. Under the direction of Gustaf Larsson, a graduate of Naas, he helped adapt Educational Sloyd to American needs at NBIS as a training lab and also went on to direct the Sloyd Training School in Boston for training teachers in manual arts instruction. Moving beyond traditional apprenticeships Educational Sloyd was a structured program wherein hand skills are taught by building a series of model projects, deliberately chosen to result in useful household objects prescribed in a specific sequence that helped bolster hand skills, mental skills, confidence and prepare for the next exercise. The goal was to train the “whole person”-the body and the mind working in concert to produce better work, an appreciation for hand work and improve overall well-being.',
      userId: 1,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      name: `$100 Router Table`,
      photoURL: 'https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/awrt50-e1615305217419.jpg',
      summary: 'As easy to use as it is to build.',
      description: 'Sometimes, less really is more. Take router tables for instance. It’s not at all difficult to ring up a $1000 tab for a manufactured router table, complete with a new router, loaded with convenience, durability, adjustability, and precision. But to me, the compelling thing about a router table is that it converts a portable power tool into a stationary power tool and thus expands its utility and versatility. A router table can be simple and quite inexpensive to make without sacrificing functionality. A basic table can be just as versatile, accurate and easy to use as one of those $1000 grandees but cost far less. I’ve just finished a $100 router table (excluding the router). I bought most of the materials and hardware at a local home center. There’s no router mounting plate to buy; the router attaches directly to the hinged top.',
      userId: 1,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      name: 'Drill Press Table',
      photoURL: 'https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/1204_3_drillpresstable_opener.jpg',
      summary: 'It’s accurate, easy to use and built to last.',
      description: 'There are all manner of drill press tables and fences, from a simple 2×4 clamped to the machine’s cast iron table to ones with gadgets and gizmos galore. The latter is not my style, so when the time came to replace my drill press table the list of requirements was short: Accuracy.The table must be flat and stay flat, and the fence must be square to the table. Ease of use.My prior table had a fence fixed to the table itself, so every fence adjustment required loosening and tightening F - style clamps to the irregular bottom of the cast iron table. Longevity.Though I tried not to, I eventually fouled my old table by drilling into it too many times. Workholding.There are times when I need to clamp down my work but normal clamps won’t reach. With these issues in mind, I developed the drill press table seen here.',
      userId: 1,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    }
  ]
  const commentMaker = () => {
    const randNum = Math.floor(Math.random() * 3.5);
    const comments = [
      `This product is so ${faker.commerce.productAdjective()}!!!`,
      `${faker.company.catchPhrase()}`,
      `So cool! I want one in ${faker.commerce.color()}`,
      `I am willing to pay you ${faker.finance.currencySymbol()} ${(Math.floor(Math.random() * 100))} and a ${faker.animal.crocodilia()} skin ${faker.commerce.product().toLowerCase()} for this!!!`
    ]
    return comments[randNum];
  }
  const productCount = await Product.findAndCountAll()
  console.log(productCount.rows[productCount.count - 1].id)
  const newDemoComments = [
    {
      content: commentMaker(),
      userId: 1,
      productId: productCount.rows[productCount.count - 1].id + 1,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 18,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 20,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 21,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 22,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 23,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 24,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 25,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 26,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: 28,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
  ]
  const newDemoProductComments = [
    {
      content: commentMaker(),
      userId: 2,
      productId: productCount.rows[productCount.count - 1].id + 1,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 3,
      productId: productCount.rows[productCount.count - 1].id + 1,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 2,
      productId: productCount.rows[productCount.count - 1].id + 2,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 3,
      productId: productCount.rows[productCount.count - 1].id + 2,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 4,
      productId: productCount.rows[productCount.count - 1].id + 2,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 3,
      productId: productCount.rows[productCount.count - 1].id + 3,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 4,
      productId: productCount.rows[productCount.count - 1].id + 3,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
    {
      content: commentMaker(),
      userId: 1,
      productId: productCount.rows[productCount.count - 1].id + 3,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    }
  ]
  const deleteProductsAndComments = () => {
    demoProducts.forEach(async product => {
      const demoProductComments = await Comment.findAll({ where: {productId: product.id }})
      console.log(demoProductComments)
      demoProductComments.forEach(async comment => {
        await comment.destroy()
      });
      await product.destroy()
    });
    return
  }
  deleteProductsAndComments()
  newDemoProducts.forEach(async product => {
    await Product.create(product)
  });
    // .then(() =>{
    //   setImmediate(() => {
    //     return
    //   })
    // }).then(() => {
    //   setTimeout(() => {
    //     newDemoComments.forEach(async (comment, i) => {
    //       try {
    //         await Comment.create(comment)
    //         console.log(i + 1)
    //       } catch (error) {
            
    //       }
    //     });
    //   }, 10000)
    //   return
    // }).then(() => {
    //   setTimeout(() => {
    //     newDemoProductComments.forEach(async (comment, i) => {
    //       try {
    //         await Comment.create(comment)
    //         console.log(i + 11)
    //       } catch (error) {
            
    //       }
    //     });
    //     return
    //   }, 10000)
    //   return
    //   }).catch(e => console.log(e))
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
