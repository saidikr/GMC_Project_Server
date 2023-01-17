const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["men's clothing", "women's clothing", "electronics", "jewelery"],
  },
  image: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
  },
  rating: {
    type: Number,
    default:0.0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  
});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
