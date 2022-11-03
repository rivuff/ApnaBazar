const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'please insert product name'],
        trim: true,
        maxLength: [100, 'product name cannot exceed 100 characters']
    },

    price:{
        type: Number,
        required:[true,'please insert product price'],
        trim: true,
        maxLength: [5, 'product name cannot exceed 5 characters']
    },

    description:{
        type:String,
        required: [true,'please enter product description']
    },
    reting:{
        type:Number,
        default: 0
    },
    images: [
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],

    category:{
        type: String,
        required: [true, 'please select catagory for this product'],
        enum:{
            values: [
                'Electronics',
                'Accessories',
                'Cameras',
                'Laptops',
                'Headphones',
                'Food',
                'Books',
                'Cloths',
                'Beauty',
                'Sports',
                'Home'
            ],
            message: 'please select correct catagory for the product'
        }
    },
    seller:{
        type:String,
        required: [true,'please enter product seller']
    },
    stock: {
        type: Number,
        required:[true, 'plese enter product strock'],
        maxLength:[5,'product name cannot exceed 5 characters'],
        default: 0
    },
    numberOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name: {
                type: String,
                required: true
            }, 
            rating: {
                type:Number,
                required:true
            },
            comment:{
                type: String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema);