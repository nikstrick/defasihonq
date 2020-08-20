const mongoose = require('mongoose');
//const Cart = require('./Cart');
const OrderSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true,
    },
    orderItems:{
        type:[{}]
    },
    orderTotal:{
        type : Number,
        required : true,
        default: 0
    },
    
    orderDate :{
        type: Date,
        default: Date.now
    },
    paymentMethod :{
        type : String,
        required : true,
    },
    address:{
        type : {},
        required : true,
    },
    completed:{
        type: Boolean,
        default:false
    }
});

module.exports = Order = mongoose.model('order',OrderSchema);