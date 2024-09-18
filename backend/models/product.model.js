const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
