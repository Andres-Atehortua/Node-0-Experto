const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const _ = require("underscore");

router.get("/", (req, res) => res.json("Hey!"));

router.get("/user", (req, res) => {
  let from = Number(req.query.from) || 0;
  let limit = Number(req.query.limit) || 0;

  let userPromise = User.find({}, "name email username img role google")
    .skip(from)
    .limit(limit);
  let countPromise = User.estimatedDocumentCount();

  Promise.all([userPromise, countPromise])
    .then((results) => {
      res.json({ users: results[0], count: results[1] });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});
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
      res.status(400).json({ ok: false, err: err });
    });
});

router.put("/user/:id", (req, res) => {
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
router.delete("/user", (req, res) => res.json("delete user"));
// router.get("/", (req, res) => res.json("Hey!"));
// router.get("/", (req, res) => res.json("Hey!"));
// router.get("/", (req, res) => res.json("Hey!"));

module.exports = router;
