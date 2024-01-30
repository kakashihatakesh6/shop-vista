const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            size: {
                type: String
            },
            color: {
                type: String
            },
            image: {
                type: String,
                // required: true
            },

        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        required: true
    },
    createdAt: {
        type: String,
        default: Date()
    }
});

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);




































// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     products: [{
//         productId: { type: String, },
//         quantity: { type: Number, default: 1 }
//     }],
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     pincode: { type: String, required: true },
//     amount: { type: Number, required: true },
//     status: { type: String, default: 'Pending', required: true }
// }, { timestamps: true });

// mongoose.models = {}
// export default mongoose.model("Order", OrderSchema);