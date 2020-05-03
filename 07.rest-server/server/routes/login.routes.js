const express = require("express");
const bcrypt = require("bcryptjs");
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
      res.json({ ok: true, user, token: "123" });
    })
    .catch((err) => res.status(500).json({ ok: false, err }));
});

module.exports = router;
