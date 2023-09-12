const userRouter = require('./userRouter.js')

const initRouters = (app) => {
    app.use('/api/user', userRouter)
}

module.exports = initRouters