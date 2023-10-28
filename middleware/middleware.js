
const { ResponseTemplate } = require('../helper/template.helper')
const Joi = require('joi');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function CheckUser(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().alphanum().max(255).required(),
            email: Joi.string().email().required(),
            password: Joi.string().alphanum().min(8).required()
        })
    // get error
        const validationResult = schema.validate(req.body, {
            abortEarly: false 
            
        })

    if (validationResult.error) {
        // Data tidak valid
        const errorMessage = validationResult.error.details[0].message;
        res.status(400).json({ error: errorMessage });
    } else {
        // Data valid
        next();

    }
}

async function HashPassword(req, res, next) {
    const { password } = req.body;
    
    if (password) {
        try {
            const saltRounds = 10; // Number of hashing rounds
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            req.body.password = hashedPassword;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        next();
    }
}

async function CheckProfile(req, res, next) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!user) {
            const errorResponse = ResponseTemplate(null, 'User not found', 'User with the given ID does not exist.', 404);
            return res.status(404).json(errorResponse);
        }

       
        next();
    } catch (error) {
        console.error("Error checking profile:", error);
        const errorResponse = ResponseTemplate(null, 'Internal Server Error', 'Error checking user profile.', 500);
        res.status(500).json(errorResponse);
    }
}


function validateRequest(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const errorResponse = ResponseTemplate(null, 'Invalid Request', error.details[0].message, 400);
            return res.status(400).json(errorResponse);
        }

        next();
    };
}



module.exports = {
    CheckUser,
    CheckProfile,
    HashPassword
}
