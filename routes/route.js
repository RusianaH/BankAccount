const express = require('express')
const router = express.Router()
const userRoute = require('./user.router')
const profileRoute = require('./profile.router')
const accountRoute = require('./account.router')
const morgan = require('morgan')

router.use(morgan('dev'))


router.use('/users', userRoute)
router.use('/profile', profileRoute)
router.use('/account', accountRoute)

module.exports = router