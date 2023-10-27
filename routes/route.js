const express = require('express')
const router = express.Router()
const userRoute = require('./user.router')
const profileRoute = require('./profile.router')
const accountRoute = require('./account.router')
const transaksi = require('./transaksi.router')
const morgan = require('morgan')

router.use(morgan('dev'))


router.use('/users', userRoute)
router.use('/profile', profileRoute)
router.use('/account', accountRoute)
router.use('./transaksi', transaksi)

module.exports = router