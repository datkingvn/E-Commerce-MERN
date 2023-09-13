const userRouter = require('./userRouter.js')
const {notFound, errorHandler} = require('../middlewares/errorHandler')
const initRouters = (app) => {
    app.use('/api/user', userRouter)



    app.use(notFound);
    app.use(errorHandler)
}

module.exports = initRouters