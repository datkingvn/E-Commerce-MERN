const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbConnect')
const initRoutes = require('./routes')


const app = express()
const PORT = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
initRoutes(app)

app.listen(PORT, () => {
    dbConnect();
    console.log('Server Running ON the Port: ' + PORT);
})