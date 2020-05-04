const express = require("express");
const router = express.Router();
const { checkRole, checkToken } = require("../middlewares/authorization");
const Category = require("../models/category.model");

// Buscar todas las categorías.
router.get("/category", (req, res) => {
  Category.find()
    .sort("description")
    .then((categories) => res.json({ ok: true, categories }))
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Buscar categoría por ID
router.get("/category/:ID", (req, res) => {
  let { ID } = req.params;
  Category.findById(ID)
    .then((category) => {
      if (!category) {
        return res
          .status(400)
          .json({ ok: false, err: "No existe categoría con ese ID" });
      }
      res.json({ ok: true, category });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Crear nueva categoria
router.post("/category", [checkToken], (req, res) => {
  let { description } = req.body;
  let user = req.user._id;
  Category.create({ user, description })
    .then((createdCategory) => res.json({ ok: true, createdCategory }))
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Modificar categoria
router.put("/category/:ID", (req, res) => {
  let { ID } = req.params;
  let body = req.body;

  Category.findByIdAndUpdate(ID, body, { new: true })
    .then((modifiedCategory) => res.json({ ok: true, modifiedCategory }))
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Eliminar categoria
router.delete("/category/:ID", [checkToken, checkRole], (req, res) => {
  const { ID } = req.params;
  Category.findByIdAndDelete(ID)
    .then((deletedCategory) => {
      if (!deletedCategory) {
        return res
          .status(400)
          .json({ ok: false, err: "No existe una categoría con ese ID." });
      }
      res.json({ ok: true, deletedCategory });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});

module.exports = router;
