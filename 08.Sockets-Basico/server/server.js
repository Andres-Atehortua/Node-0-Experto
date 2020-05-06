const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
//Esto es para poder acceder al req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Habilitar public
app.use(express.static(path.resolve(__dirname, "./../public")));

app.listen(process.env.PORT, () =>
  console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
);
