const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {AuthUser}= require('../controller/user.controller')

passport.serializeUser((users, done) => done(null, users.id))
passport.deserializeUser(async (id, done) => {

    const checkUser = await prisma.users.findUnique({
        where: {
            id
        }
    })

    done(null, checkUser)
})


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, AuthUser))

module.exports = passport