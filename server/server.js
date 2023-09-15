const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbConnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
const PORT = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
initRoutes(app)

app.listen(PORT, () => {
    dbConnect();
    console.log('Server Running ON the Port: ' + PORT);
})