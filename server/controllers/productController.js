const ProductModel = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

// Create Product
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing Input!');
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title); // Chuyển title sang slug
    const newProduct = await ProductModel.create(req.body);
    return res.status(200).json({
        success: !!newProduct,
        createdProduct: newProduct ? newProduct : 'Cannot Create New Product!'
    })
})

// Get Single Product
const getSingleProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params;
    const product = await ProductModel.findById(pid);
    return res.status(200).json({
        success: !!product,
        productData: product ? product : 'Cannot Find Product!'
    })
})

// Get All Product
const getAllProduct = asyncHandler(async (req, res) => {
    const queries = {...req.query};
    // Loại bỏ các trường đặc biệt khỏi queries
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(element => delete queries[element]);

    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries); // Convert sang string
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // Thêm dấu $ sau gte|gt|lte|lt (Ex: price: { '$gt': '50000' })
    let formatedQueries = JSON.parse(queryString); // Convert lại sang Object


    // Filtering
    if (queries.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}; // $regex: queries.title tìm kiếm theo tên, $option: 'i' không phân biệt chữ hoa, thường
    let queryCommand = ProductModel.find(formatedQueries);

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' '); // Ex: abc, efg => abc efg
        queryCommand = queryCommand.sort(sortBy);
    }
    ;

    // Fields Limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields); // Muốn lấy trường nào và không muốn lấy trường nào
    }

    // Pagination (limit: số object lấy về 1 lần gọi API, skip)
    const page = +req.query.page || 1; // (Bỏ dấu + trước để convert thành kiểu số (number) (Ex: +2 => 2 / +ckckck => NaN)
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    // Execute query
    queryCommand.exec()
        .then(async (reponse) => {
            const matchedProductCount = await ProductModel.countDocuments(formatedQueries);
            return res.status(200).json({
                success: true,
                matchedProductCount: matchedProductCount,
                productsData: reponse,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProductResponse = await ProductModel.findByIdAndUpdate(pid, req.body, {new: true});
    return res.status(200).json({
        success: !!updatedProductResponse,
        updatedProduct: updatedProductResponse ? updatedProductResponse : 'Cannot Update Product!'
    })
})

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params;
    const deleledProductResponse = await ProductModel.findByIdAndDelete(pid);
    return res.status(200).json({
        success: !!deleledProductResponse,
        deletedProduct: deleledProductResponse ? deleledProductResponse : 'Cannot Delete Product!'
    })
})

// Ratings
const ratings = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {star, comment, pid} = req.body;
    if (!star && !pid) throw new Error('Missing Something :(');
    const ratingProduct = await ProductModel.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find(element => element.votedBy.toString() === _id);

    if (alreadyRating) {
        // update star & comment
        //  Trong MongoDB, $set được sử dụng để cập nhật giá trị của một trường trong tài liệu. Khi muốn cập nhật một trường nằm trong một phần tử cụ thể của một mảng, ta sử dụng $ để chỉ định phần tử đó.
        await ProductModel.updateOne({
            ratings: {$elemMatch: alreadyRating}
        }, {
            $set: {
                "ratings.$.star": star,
                "ratings.$.comment": comment
            }
        })
    } else {
        // add star & comment
        const ratingUpdateResponse = await ProductModel.findByIdAndUpdate(
            // $push được sử dụng để thêm một giá trị vào một mảng đã tồn tại trong một tài liệu (document).
            pid, {
                $push: {
                    ratings: {star, comment, votedBy: _id}
                }
            }, {new: true}
        );
    }

    // Sum ratings
    const updatedProduct = await ProductModel.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    // sum là giá trị tích lũy, ban đầu có giá trị là 0, element là phần tử hiện tại trong quá trình lặp.
    const sumRatings = updatedProduct.ratings.reduce((sum, element) => sum + +element.star, 0);
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10;

    await updatedProduct.save();

    return res.status(200).json({
        status: true,
        updatedProduct
    })
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if (!req.files) throw new Error('No Images Upload');
    // $each cho phép chúng ta thêm nhiều giá trị vào mảng images của tài liệu được cập nhật.
    const uploadImageResponse = await ProductModel.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(element => element.path)}}}, {new: true});
    return res.status(200).json({
        status: !!uploadImageResponse,
        updatedProduct: uploadImageResponse ? uploadImageResponse : 'Upload Images Failed!'
    });
});

module.exports = {
    createProduct, getSingleProduct, getAllProduct,
    updateProduct, deleteProduct,
    ratings,
    uploadImagesProduct
}