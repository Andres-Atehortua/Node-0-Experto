const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Usuario = require("./../models/user.model");

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Usuario.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ ok: false, err: "(Usuario) o contraseña incorrectos" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(400)
          .json({ ok: false, err: "Usuario o (contraseña) incorrectos" });
      }

      let token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE, // 60 * 60 es una hora * 24 es un dia * 30 son 30 dias
      });

      res.json({ ok: true, user, token });
    })
    .catch((err) => res.status(500).json({ ok: false, err }));
});

module.exports = router;
