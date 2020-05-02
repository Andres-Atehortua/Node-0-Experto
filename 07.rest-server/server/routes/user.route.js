const express = require("express");
const router = express.Router();
const User = require("./../models/user.model");

router.get("/", (req, res) => res.json("Hey!"));
router.get("/user", (req, res) => res.json("get user"));
router.post("/user", (req, res) => {
  let { name, email, password, role, status, google, username } = req.body;
  const newUser = new User({
    name,
    username,
    email,
    password,
    role,
    status,
    google,
  });
  // User.create({ name, email, password, img, role, status, google });
  newUser
    .save()
    .then((userDB) => res.status(201).json({ ok: true, userDB }))
    .catch((err) => {
      res.status(400).json({ ok: false, err: err.errors });
    });
});

router.put("/user/:id", (req, res) => {
  let { id } = req.params;
  res.json({ id });
});
router.delete("/user", (req, res) => res.json("delete user"));
// router.get("/", (req, res) => res.json("Hey!"));
// router.get("/", (req, res) => res.json("Hey!"));
// router.get("/", (req, res) => res.json("Hey!"));

module.exports = router;
