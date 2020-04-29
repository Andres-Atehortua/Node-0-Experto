// Requireds
const express = require("express");
const app = express();

// Middlewares
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
  let nombre = "Andrés";
  res.render("home", { nombre, anio: new Date().getFullYear() });
});

app.get("/data", (req, res) => res.send("Soy la dataaaaaaa"));
app.listen(3000, () => console.log("Aplicacion corriendo en el puerto 3000"));
