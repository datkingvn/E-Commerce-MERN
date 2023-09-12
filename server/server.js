import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./config/dbConnect.js";

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8888
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/', (req, res) => {
    res.send('Sever ONN')
})

app.listen(PORT, () => {
    dbConnect()
    console.log('Server Running ON Port: ' + PORT)
})