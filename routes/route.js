const express = require('express')
const router = express.Router()
const userRoute = require('./user.router')
const profileRoute = require('./profile.router')
const accountRoute = require('./account.router')
const transaksiRoute = require('./transaksi.router')
const morgan = require('morgan')

router.use(morgan('dev'))


router.use('/users', userRoute);
router.use('/users/register', profileRoute)
// router.use('/profile', profileRoute);
router.use('/account', accountRoute);
router.use('/transactions', transaksiRoute);

module.exports = router