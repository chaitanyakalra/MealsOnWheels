// const mongoose = require('mongoose')
// const {Schema} = mongoose;

// const OrderSchema = new Schema({
//     email : {
//         type : String,
//         required : true,
//         unique : true
//     },
    // order_data : {
    //     type : Array,
    //     required : true
    // }
// })

// module.exports = mongoose.model('order', OrderSchema)

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define nested schema for order items if needed
const OrderItemSchema = new Schema({
    // Define properties for each order item
});

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
        order_data : {
        type : Array,
        required : true
    } 
});

// Export model named Order (singular)
module.exports = mongoose.model('Order', OrderSchema);
