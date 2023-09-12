const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI)
        if (dbConnection.connection.readyState === 1) console.log('DB Connection Successfully!')
        else console.log('DB Connecting...')
    } catch (err) {
        console.log('DB Connection Failed!')
        throw new Error(err)
    }
}

module.exports = dbConnect