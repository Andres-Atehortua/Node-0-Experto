const express = require("express");
const _ = require("underscore");
const { checkRole, checkToken } = require("./../middlewares/authorization");
const { ProductModel } = require("./../models");

const router = express.Router();

// Obtener todos los productos de forma paginada
router.get("/products", [checkToken], (req, res) => {
  let from = Number(req.query.from) || 0;
  let limit = Number(req.query.limit) || 0;

  let productPromise = ProductModel.find({ available: true })
    .sort("name")
    .skip(from)
    .limit(limit)
    .populate("category", { user: 0 });
  let countPromise = ProductModel.countDocuments({ available: true });

  Promise.all([productPromise, countPromise])
    .then((results) => {
      res.json({ products: results[0], count: results[1] });
    })
    .catch((err) => res.status(500).json({ ok: false, err }));
});

// Obtener producto por id

router.get("/products/:ID", [checkToken], (req, res) => {
  let { ID } = req.params;
  ProductModel.findById(ID)
    .populate("category", { user: 0 })
    .then((product) => {
      if (!product) {
        return res
          .status(500)
          .json({ ok: false, err: "No existe producto con ese ID" });
      }
      res.json({ ok: true, product });
    })
    .catch((err) => res.status(500).json({ ok: false, err }));
});

// Buscar un producto por término
router.get("/products/search/:param", [checkToken], (req, res) => {
  let { param } = req.params;
  ProductModel.find({ name: new RegExp(param, "i") })
    .populate("category", { user: 0 })
    .then((products) => {
      if (products.length === 0) {
        return res
          .status(400)
          .json({ ok: false, err: "No existen productos para su búsqueda" });
      }
      res.json({ ok: true, products });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Crear un nuevo producto

router.post("/products", [checkToken, checkRole], (req, res) => {
  let { name, price, description, available, category } = req.body;
  let user = req.user._id;
  ProductModel.create({
    name,
    price,
    description,
    available,
    user,
    category,
  })
    .then((newProduct) => res.status(201).json({ ok: true, newProduct }))
    .catch((err) => res.status(500).json({ ok: false, err }));
});

// Actualizar un producto

router.put("/products/:ID", [checkToken, checkRole], (req, res) => {
  let { ID } = req.params;
  let body = _.pick(req.body, ["name", "price", "description"]);
  ProductModel.findByIdAndUpdate(ID, body, {
    new: true,
  })
    .then((modifiedProduct) => res.json({ ok: true, modifiedProduct }))
    .catch((err) => res.status(500).json({ ok: false, err }));
});

// Eliminar un producto

router.delete("/products/:ID", [checkToken, checkRole], (req, res) => {
  let { ID } = req.params;
  ProductModel.findOneAndUpdate(ID, { available: false }, { new: true })
    .then((unavailableProduct) => {
      if (!unavailableProduct) {
        return res
          .status(400)
          .json({ ok: false, err: "No existe producto con ese ID" });
      }
      res.json({ ok: true, unavailableProduct });
    })
    .catch((err) => res.status(500).json({ ok: false, err }));
});

module.exports = router;
