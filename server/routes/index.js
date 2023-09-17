const userRouter = require('./userRouter.js');
const productRouter = require('../routes/productRoute');
const productCategoryRouter = require('../routes/productCategoryRoute');
const blogCategoryRoute = require('../routes/blogCategoryRoute');
const {notFound, errorHandler} = require('../middlewares/errorHandler');
const initRouters = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/product-category', productCategoryRouter);
    app.use('/api/blog-category', blogCategoryRoute);


    app.use(notFound);
    app.use(errorHandler)
}

module.exports = initRouters