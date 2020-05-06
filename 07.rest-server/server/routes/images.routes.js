const express = require("express");
const fs = require("fs");
const path = require("path");

const { checkTokenUrl } = require("./../middlewares/authorization");

const router = express.Router();

router.get("/image/:type/:img", checkTokenUrl, (req, res) => {
  let { type, img } = req.params;

  let pathImg = path.resolve(__dirname, `../../uploads/${type}/${img}`);
  let noImagePath = path.resolve(__dirname, "../assets/no-image.jpg");

  fs.existsSync(pathImg) ? res.sendFile(pathImg) : res.sendFile(noImagePath);
});

module.exports = router;
