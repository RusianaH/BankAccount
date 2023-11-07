const express = require('express')
const app = express()
const router = require('./routes/route')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash')
require('dotenv').config()
const passport = require('passport')
const PORT = process.env.PORT || 3000


// app.use(morgan('combined', {
//     skip: function (req, res) {return res.statusCode < 400 }
// }))

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use(flash())

// SWAGGER
const swaggerUI = require('swagger-ui-express')
const swaggerDef = require('./helper/swagger_template.helper')
const swaggerJsdoc = require('swagger-jsdoc')


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title : 'back-end',
            version: '1.0.0',
            description:'your API description'
        },
        servers:[
            {
                url:'http://localhost:3000',
                description:'development server'
            },
        ],
    },
    apis: ['./routes/user.router.js','./routes/profile.router.js','./routes/account.router.js', './routes/transaksi.router.js'],
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)



app.use(express.urlencoded({ extended: false }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.set('view engine', 'ejs')
app.use('/', router)

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})