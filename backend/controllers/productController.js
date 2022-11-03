const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const product = require('../models/product');
const Product = require('../models/product');
const errorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures')


//create a new product
exports.newProduct = catchAsyncErrors(async(req,res,next)=>{
    
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}) 


//get all products=>/api/v1/prodfcts?keyword:apple
exports.getProducts =catchAsyncErrors(async (req,res,next)=>{

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pegination(resPerPage)


    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    // apiFeatures.pagination(resPerPage)
    // products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})


//Get single product details =>/api/v1/product/:id
exports.getSingleProduct =catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new errorHandler('product not found',404));
    }
     


    res.status(200).json({
        success: true,
        product
    })

})


//update product  => /api/v1/product/:id
exports.updateProduct =catchAsyncErrors(async(req,res,next)=> {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new errorHandler('product not found',404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        product
    })
})

//delete product => /api/v1/admin/product/:id

exports.deleteProduct =catchAsyncErrors( async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new errorHandler('product not found',404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message: 'product is deleted'
    })
})