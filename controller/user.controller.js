const { ComparePassword, HashPassword } = require('../helper/hash.helper')
const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function CreateUser (req, res){
 
    try{
    const hashPass = await HashPassword(req.body.password)

    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    }
    
    const existingUser = await prisma.users.findFirst({
        where: {
            email: req.body.email,
        },
    });


    if (existingUser) {
        const errorMessage = 'User already exists with the same email';
        let resp = ResponseTemplate(null, errorMessage, null, 400);
        return res.status(400).json(resp);
    }
    
    const user = await prisma.users.create({
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    }
     
    catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


async function Get(req, res) {

    const { name, email, password } = req.query

    const payload = {}

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }

    try {

        const users = await prisma.users.findMany({
            where: payload
        });

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}
async function AuthUser(email, password, done) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return done(null, false, {
                message: 'invalid email'
            })
        }

        const comparePass = ComparePassword(password, user.password)

        if (!user || !comparePass) {
            return done(null, false, {
                message: 'invalid password'
            })
        }
        return done(null, user)

    } catch (error) {
        return done(null, false, {
            message: error.message
        })
    }
}

async function Login(req, res) {


    try {
        const { email, password } = req.body

        const checkUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        // console.log(checkUser)

        // if (user == null) {
        //     res.status(400).json({
        //         data: null,
        //         status: 400,
        //         message: "email is not found or incorrect"
        //     })
        // }
        console.log(checkUser.password, password)

        const checkPassword = await ComparePassword(password, checkUser.password)

        if (!checkPassword) {
            res.status(400).json({
                data: null,
                status: 400,
                message: "password is not correct"
            })
            return
        }

        const token = jwt.sign({ email: checkUser.email, user_id: checkUser.id },
            process.env.SECRET_KEY);

        res.status(200).json({
            status: 200,
            message: 'success',
            data: {
                token,
            }
        })
        return


    } catch (error) {
        res.status(500).json({
            data: error.message,
            status: 500,
            message: "internal server error"
        })
    }
}

async function Oauth2(req, res) {

    let token = jwt.sign({ ...req.user, password: null }, process.env.SECRET_KEY)

    return res.status(200).json({
        status: 'success',
        message: ' OK',
        data: {
            token
        }
    })

}

async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const userswithProfile = await prisma.users.findUnique({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(userswithProfile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { name, email, password } = req.body
    const { id } = req.params

    const payload = {}

    if (!name && !email && !password) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }


    try {
        const user = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { id } = req.params;

    try {
        const user = await prisma.users.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


module.exports = {
    CreateUser,
    Get,
    GetByPK,
    Update,
    Delete,
    AuthUser,
    Login,
    Oauth2

}


  
