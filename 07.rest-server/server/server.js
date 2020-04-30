const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//app.use suelen ser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json("Hey!"));
app.get("/user", (req, res) => res.json("get user"));
app.post("/user", (req, res) => {
  let { name, username, age } = req.body;
  if (name && username && age) res.json({ name, username, age });
  else
    res.status(400).json({ ok: false, message: "You have to send all info." });
});
app.put("/user/:id", (req, res) => {
  let { id } = req.params;
  res.json({ id });
});
app.delete("/user", (req, res) => res.json("delete user"));
// app.get("/", (req, res) => res.json("Hey!"));
// app.get("/", (req, res) => res.json("Hey!"));
// app.get("/", (req, res) => res.json("Hey!"));

app.listen(process.env.PORT || 3001, () =>
  console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3001}`)
);
