var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Product } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');
const userApi = require('./api-users')

router.use('/users', userApi)



module.exports = router;
