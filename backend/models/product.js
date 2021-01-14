import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    rating: Number,
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }

})


const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    name: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        category: true
    },
    image: {
        type: String,
        require: true
    },  
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    countInStock: {
        type: Number,
        require: true,
        default: 0
    },
    rating: {
        type: Number,
        require: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema]

    },
    {
        timestamps: true
    }
)

export default mongoose.model('Product', productSchema)
