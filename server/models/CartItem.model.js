const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CartItemSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  email: { type: String, require: true },
  price: { type: Number, require: true },
  name: { type: String, require: true },
  image: { type: String, require: true },
  quantity: { type: Number, require: true },
});
const CartItemModel = model("CartItem", CartItemSchema);
module.exports = CartItemModel;
