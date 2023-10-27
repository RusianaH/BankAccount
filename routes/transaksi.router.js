const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/transaksi.controller')
// const {} = require('../middleware/middleware')

router.get('/', Get)
router.post('/', Insert)
router.get('/:id', GetByPK)
router.put('/:id', Update)
router.delete('/:id', Delete)

module.exports = router