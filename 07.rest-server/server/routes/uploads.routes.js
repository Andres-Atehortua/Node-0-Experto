const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

// Default options
router.use(fileUpload({ useTempFiles: true }));

router.put("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No se ha cargado ningun archivo.");
  }
  let file = req.files.file; // file es el nombre del input
  file.mv("uploads/filename.png", (err) => {
    if (err) {
      return res.status(500).json({ ok: false, err });
    }
    res.json({ ok: true, message: "Imagen subida con éxito" });
  });
});

module.exports = router;
