const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckUser, HashPassword } = require('../middleware/middleware')

router.get('/', Get, HashPassword)
router.post('/', CheckUser, Insert)
router.get('/:id', GetByPK, HashPassword)
router.put('/:id', Update)
router.delete('/:id', Delete)

module.exports = router