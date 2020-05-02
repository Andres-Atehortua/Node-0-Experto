const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => res.json("Hey!"));
router.get("/user", (req, res) => res.json("get user"));
router.post("/user", (req, res) => {
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
      res.status(400).json({ ok: false, err: err.errors });
    });
});

router.put("/user/:id", (req, res) => {
  let { id } = req.params;
  let body = req.body;

  User.findByIdAndUpdate(id, body, { new: true })
    .then((user) => res.status(202).json({ ok: true, user }))
    .catch((err) => res.status(400).json({ ok: false, err }));
});
router.delete("/user", (req, res) => res.json("delete user"));
// router.get("/", (req, res) => res.json("Hey!"));
// router.get("/", (req, res) => res.json("Hey!"));
// router.get("/", (req, res) => res.json("Hey!"));

module.exports = router;
