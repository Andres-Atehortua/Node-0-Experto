const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: [true, "El nombre es necesario"] },
  price: {
    type: Number,
    required: [true, "El precio unitario es necesario"],
  },
  description: { type: String, required: false },
  available: { type: Boolean, required: true, default: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    autopopulate: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
});
CategorySchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Product", productSchema);
