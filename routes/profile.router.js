const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/profile.controller')
const { CheckProfile } = require('../middleware/middleware')




/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *      - " profile"
 *     summary: Retrieve a list of profile
 *     description: Retrieve a list of profile from JSONPlaceholder.
*/
router.get('/', Get)

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     tags:
 *      - " profile"
 *     summary: Retrieve a single of profile.
 *     responses:
 *       200:
 *         description: A single profile.
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
 *                       description: The profile ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The profile's name.
*/
router.get('/:id', GetByPK)

/**
 * @swagger
 * /profile:
 *   post:
 *     tags:
 *     - " profile"
 *     summary: Create a JSONPlaceholder profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The profile's name.
 *     responses:
 *       201:
 *         description: profile created successfully
 */
 router.post('/users', CheckProfile, Insert)

 /**
 * @swagger
 * /profile:
 *   put:
 *     tags:
 *     - " profile"
 *     summary: Update profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated profile's name.
 *     responses:
 *       200:
 *         description: profile updated successfully
 */
router.put('/:id', Update)

/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     tags:
 *     - " profile"
 *     summary: Delete profile by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the profile to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 *       404:
 *         description: profile not found
 */
router.delete('/:id', Delete)

module.exports = router