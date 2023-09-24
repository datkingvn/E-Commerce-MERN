const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/productCategoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const fakeData = require('../../data/data2.json');
const categoryData = require('../../data/cate_brand');
const fn = async (product) => {
    const color = product?.variants?.find(el => el.label === 'Color')?.variants[0];

    if (!color) {
        console.error('Invalid product data: color is missing or invalid.');
        return;
    }

    await ProductModel.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price.match(/\d+/g).join('')) / 100),
        category: product?.category?.[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: color,
        thumb: product?.thumb
    });
};

const insertProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let product of fakeData) promises.push(fn(product));
    await Promise.all(promises);

    return res.status(200).json('Done')
});

const fn2 = async (cate) => {
    await CategoryModel.create({
        title: cate?.cate,
        brand: cate?.brand
    })
}

const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let cate of categoryData) promises.push(fn2(cate));
    await Promise.all(promises);

    return res.status(200).json('Done')
});

module.exports = {
    insertProduct, insertCategory
}