
const swaggerDefinition = {
    swaggerDefinition: {
        openapi: '2.0.0',
        info: {
            title : 'back-end',
            version: '1.0.0',
            description:'your API description'
        },
        servers:[
            {
                url:'http://localhost:3000'
            },
        ],
    },
    apis: ['./routes/user.router.js','./routes/profile.router.js','./routes/account.router.js','./routes/transaksi.router.js'],
}

module.exports = swaggerDefinition