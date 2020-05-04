const express = require("express");

const mongoose = require("mongoose");
const path = require("path");
const app = express();

const bodyParser = require("body-parser");
require("dotenv").config();
//app.use suelen ser middlewares

//Esto es para poder acceder al req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Habilitar public
app.use(express.static(path.resolve(__dirname, "./../public")));

require("./routes")(app);

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((x) =>
    console.log(
      `Conectado a mongo! nombre de la base de datos: "${x.connections[0].name}"`
    )
  )
  .catch((err) =>
    console.log("No se ha podido conectar a la base de datos: ", err)
  );

app.listen(process.env.PORT, () =>
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
);
