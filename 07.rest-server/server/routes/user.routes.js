const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("underscore");
const User = require("../models/user.model");
const { checkRole, checkToken } = require("./../middlewares/authorization");

const router = express.Router();

// Ruta para obtener los registros de usuarios de forma paginada.
router.get("/user", [checkToken], (req, res) => {
  let from = Number(req.query.from) || 0;
  let limit = Number(req.query.limit) || 0;

  let userPromise = User.find(
    { status: true },
    "name email username img role google, status"
  )
    .skip(from)
    .limit(limit);
  let countPromise = User.estimatedDocumentCount({ status: true });

  Promise.all([userPromise, countPromise])
    .then((results) => {
      res.json({ users: results[0], count: results[1] });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Ruta para crear un nuevo registro de usuario
router.post("/user", [checkToken, checkRole], (req, res) => {
  let { name, email, password, role, status, google, username } = req.body;
  // User.create({ name, email, password, img, role, status, google });
  User.create({
    name,
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
    status,
    google,
  })
    .then((userDB) => res.status(201).json({ ok: true, userDB }))
    .catch((err) => {
      res.status(400).json({ ok: false, err: err });
    });
});
// Ruta para modificar el registro de un usuario.
router.put("/user/:id", [checkToken, checkRole], (req, res) => {
  let { id } = req.params;
  let body = _.pick(req.body, [
    "name",
    "email",
    "username",
    "img",
    "role",
    "status",
  ]);

  User.findByIdAndUpdate(id, body, { new: true })
    .then((user) => res.status(202).json({ ok: true, user }))
    .catch((err) => res.status(400).json({ ok: false, err }));
});
// Ruta para borrar de forma permanente un registro de usuario.
router.delete("/user/:id", [checkToken, checkRole], (req, res) => {
  let { id } = req.params;
  User.findByIdAndRemove(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res
          .status(400)
          .json({ ok: false, err: "Usuario no encontrado." });
      }
      res.json({ ok: true, deletedUser });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});
// Ruta para "banear" a un usuario sin eliminar su registro.
router.delete("/user/ban/:id", [checkToken, checkRole], (req, res) => {
  let { id } = req.params;
  User.findByIdAndUpdate(id, { status: false }, { new: true })
    .then((bannedUser) => {
      if (!bannedUser) {
        return res
          .status(400)
          .json({ ok: false, err: "Usuario no encontrado." });
      }
      res.status(202).json({ ok: true, bannedUser });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});

module.exports = router;
