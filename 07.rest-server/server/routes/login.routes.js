const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Usuario = require("./../models/user.model");

router.post("/login", (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
