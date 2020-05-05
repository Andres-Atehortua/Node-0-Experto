const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const router = express.Router();
const { UserModel } = require("./../models");

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  UserModel.findOne({ email })
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

// CONFIGURACIONES DE GOOGLE

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();

  return {
    name: payload.name,
    email: payload.name,
    img: payload.picture,
    google: true,
  };
}

router.post("/google", async (req, res) => {
  let { idtoken } = req.body;
  let googleUser = await verify(idtoken).catch((err) =>
    res.status(403).json({ ok: false, err })
  );
  UserModel.findOne({ email: googleUser.email })
    .then((userDB) => {
      if (userDB) {
        if (!userDB.google) {
          return res.status(400).json({
            ok: false,
            err: "Debe usar autenticación normal.",
          });
        } else {
          let token = jwt.sign({ userDB }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });

          return res.json({
            ok: true,
            user: userDB,
            token,
          });
        }
      } else {
        let { name, email, img, google } = googleUser;
        // Si no existe el usuario en la Base de Datos
        UserModel.create({ name, email, img, google, password: ":)" })
          .then((user) => {
            let token = jwt.sign({ user }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRE,
            });
            res.json({ ok: true, user, token });
          })
          .catch((err) => res.status(500).json({ ok: false, err }));
      }
    })
    .catch((err) => res.status(500).json({ ok: false, err }));
});

module.exports = router;
