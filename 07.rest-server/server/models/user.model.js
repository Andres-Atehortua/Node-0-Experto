const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

let UserSchema = new Schema(
  {
    // Al poner el required: [true, ""], en el string podemos poner el mensaje que queremos que se muestre
    name: { type: String, required: [true, "El nombre es necesario."] },
    email: {
      type: String,
      required: [true, "El email es necesario"],
      unique: true,
    },
    username: { type: String, unique: true },
    password: { type: String, required: [true, "La contraseña es necesaria."] },
    img: { type: String },
    role: {
      type: String,
      default: "USER_ROLE",
      enum: {
        values: ["USER_ROLE", "ADMIN_ROLE"],
        message: "{VALUE} no es un rol válido",
      },
    },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};
UserSchema.plugin(uniqueValidator, { message: "{PATH} ya está en uso." });

module.exports = mongoose.model("User", UserSchema);
