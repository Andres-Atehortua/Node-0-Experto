// Requireds
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

// Middlewares
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("view engine", "hbs");
require("./config/hbs/helpers");

app.get("/", (req, res) => {
  let nombre = "Andrés";
  res.render("home", { nombre, anio: new Date().getFullYear() });
});
app.get("/about", (req, res) =>
  res.render("about", { anio: new Date().getFullYear() })
);

app.get("/data", (req, res) => res.send("Soy la dataaaaaaa"));
app.listen(3000, () => console.log("Aplicacion corriendo en el puerto 3000"));
