const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/account.controller')
const { } = require('../middleware/middleware')

/**
 * @swagger
 * /account:
 *   get:
 *     tags:
 *      - " account"
 *     summary: Retrieve a list of account
 *     description: Retrieve a list of account from JSONPlaceholder.
*/
router.get('/',Get)

/**
 * @swagger
 * /account/{id}:
 *   get:
 *     tags:
 *      - " account"
 *     summary: Retrieve a single of account.
 *     responses:
 *       200:
 *         description: A single account.
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
 *                       description: The account ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The account's name.
*/
 router.get('/:id', GetByPK)

/**
 * @swagger
 * /account:
 *   post:
 *     tags:
 *     - " account"
 *     summary: Create account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The account's name.
 *     responses:
 *       201:
 *         description: account created successfully
 */
router.post('/', Insert)

/**
 * @swagger
 * /account:
 *   put:
 *     tags:
 *     - " account"
 *     summary: Update account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated account's name.
 *     responses:
 *       200:
 *         description: account updated successfully
 */
 router.put('/', Update)

 /**
 * @swagger
 * /account/{id}:
 *   delete:
 *     tags:
 *     - " account"
 *     summary: Delete account by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the account to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: account deleted successfully
 *       404:
 *         description: account not found
 */
 router.delete('/:id', Delete)









module.exports = router