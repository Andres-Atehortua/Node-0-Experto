const mongoose = require("mongoose");
const { Schema } = mongoose;

let CategorySchema = new Schema({
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: ["email", "username"] },
  },
});
CategorySchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Category", CategorySchema);
