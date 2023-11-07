const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/transaksi.controller')
const {} = require('../middleware/middleware')


/**
 * @swagger
 * /transactions:
 *   get:
 *     tags:
 *      - " Transactions"
 *     summary: Retrieve a list of Transactionss
 *     description: Retrieve a list of Transactionss from JSONPlaceholder.
*/
router.get('/', Get)

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags:
 *      - " Transactions"
 *     summary: Retrieve a single of Transactions.
 *     responses:
 *       200:
 *         description: A single Transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The Transactions ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The Transactions's name.
*/
router.get('/:id', GetByPK)

/**
 * @swagger
 * /trasactions:
 *   post:
 *     tags:
 *     - " Transactions"
 *     summary: Create Transactions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The Transactions's name.
 *     responses:
 *       201:
 *         description: Transactions created successfully
 */
router.post('/', Insert)

/**
 * @swagger
 * /transactions:
 *   put:
 *     tags:
 *     - " Transactions"
 *     summary: Update Transactions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated Transactions's name.
 *     responses:
 *       200:
 *         description: Transactions updated successfully
 */
router.put('/:id', Update)

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     tags:
 *     - " Transactions"
 *     summary: Delete Transactions by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Transactions to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Transactions deleted successfully
 *       404:
 *         description: Transactions not found
 */
router.delete('/:id', Delete)

module.exports = router