const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
  },
  productType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: [
    {
      type: String,
    },
  ],
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = mongoose.model('products', ProductSchema);
