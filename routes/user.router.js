const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckUser } = require('../middleware/middleware')

router.get('/', Get)
router.post('/', CheckUser, Insert)
router.get('/:id', GetByPK)
router.put('/:id', Update)
router.delete('/:id', Delete)

module.exports = router