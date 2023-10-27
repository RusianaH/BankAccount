const express = require("express");
const dotenv = require("dotenv");
const app = express();
const router = require("./routes/route");


dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended :false}))

// app.set('view engine', 'ejs')
app.use('/', router)



app.listen(PORT, () => {
    console.log("running in port:" + PORT)
});