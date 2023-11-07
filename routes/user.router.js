const express = require('express')
const passport = require('../lib/passport')
const profileRoute = require('./profile.router')
const router = express.Router()
const {Get, GetByPK, Update, Delete, CreateUser } = require('../controller/user.controller')
const { CheckUser } = require('../middleware/middleware')

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - " Users"
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from JSONPlaceholder.
*/
router.get('/', Get)
// router.get('/login', (req, res) => {
//     res.render('login.ejs')
// })

router.get('/register', (req, res, next) => {
    res.render('register.ejs')
    return
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - " Users"
 *     summary: Retrieve a single of user.
 *     responses:
 *       200:
 *         description: A single user.
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
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
*/
 router.get('/:id', GetByPK)

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *     - " Users"
 *     summary: Create user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/register',CreateUser)

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login'
}))

/** 
 * @swagger
 * /users:
 *   put:
 *     tags:
 *     - " Users"
 *     summary: Update user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated user's name.
 *     responses:
 *       200:
 *         description: User updated successfully
 */
 router.put('/', Update)

 /**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *     - " Users"
 *     summary: Delete user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
 router.delete('/:id', Delete)









module.exports = router