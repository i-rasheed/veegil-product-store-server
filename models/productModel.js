const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  userId: {type: String, required: true}
});

module.exports = Product = mongoose.model("product", productSchema);
