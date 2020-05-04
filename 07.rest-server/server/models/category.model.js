const mongoose = require("mongoose");
const { Schema } = mongoose;

let categoriaSchema = new Schema({
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Categoria", categoriaSchema);
