const userRouter = require('./userRouter.js')
const productRouter = require('../routes/productRoute')
const {notFound, errorHandler} = require('../middlewares/errorHandler')
const initRouters = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)


    app.use(notFound);
    app.use(errorHandler)
}

module.exports = initRouters