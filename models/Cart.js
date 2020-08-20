const mongoose = require('mongoose');
const Product = require('./Product');


const Cart = new mongoose.Schema({
    item:Product,
    quantity:{
        type:String,
        required:true
    }
});


module.exports = Cart = mongoose.model('cart',Cart);