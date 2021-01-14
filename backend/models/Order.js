import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    orderItems:[
        {
            name: {
                type: String,
                require: true
            },
            image: {
                type: String,
                require: true
            },
            qty: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            }
        }
    ],
    shippingAddress: {
        address: {type: String, require: true},
        city: {type: String, require: true},
        country: {type: String, require: true},
        postalCode: {type: String, require: true}
    },
    paymentMethod: {type: String, require: true},
    paymentResult:{
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String}
    },
    taxPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    isPayed: {
        type: Boolean,
        default: false,
        require: true

    },
    payedAt: {type: Date},
    isDelivered:{
        type: Boolean,
        default: false,
        require: true
    },
    deliveredAt: {type: Date}

}, {
    timestamps: true
}) 

export default mongoose.model('Order', orderSchema)