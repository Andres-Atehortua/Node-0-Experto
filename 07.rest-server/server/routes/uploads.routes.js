const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { ProductModel, UserModel } = require("./../models");

// Default options
router.use(fileUpload({ useTempFiles: true }));

router.put("/upload/:type/:ID", (req, res) => {
  let { type, ID } = req.params;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No se ha cargado ningun archivo.");
  }

  // Validación de tipos.
  validTypes = ["products", "users"];
  if (validTypes.indexOf(type) < 0) {
    return res.status(400).json({
      ok: false,
      err: "Tipo no válido. Los tipos permitidos son: " + validTypes.join(", "),
      type,
    });
  }

  let file = req.files.file; // file es el nombre del input
  // Extensiones permitidas
  let extensions = ["png", "jpg", "gif", "jpeg"];

  let name = file.name.split(".");

  let extFile = file.name.split(".")[name.length - 1];

  if (extensions.indexOf(extFile) < 0) {
    return res.status(400).json({
      ok: false,
      err:
        "Extensión no válida. Las extensiones permitidas son: " +
        extensions.join(", "),
      ext: extFile,
    });
  }

  // Cambiar nombre al archivo

  let fileName = `${ID}-${new Date().getMilliseconds()}.${extFile}`;

  file.mv(`uploads/${type}/${fileName}`, (err) => {
    if (err) {
      return res.status(500).json({ ok: false, err });
    }

    // Aquí la imagen ya está cargada.
    type === "users"
      ? userImg(ID, fileName, type, res)
      : productImg(ID, fileName, type, res);
  });
});

function deleteImg(type, fileName) {
  let imgPath = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);
  if (fs.existsSync(imgPath)) {
    fs.unlinkSync(imgPath);
  }
}

function userImg(ID, fileName, type, res) {
  UserModel.findByIdAndUpdate(ID, { img: fileName })
    .then((oldUser) => {
      if (!oldUser) {
        deleteImg(type, fileName);
        return res
          .status(400)
          .json({ ok: false, err: "El ID no corresponde a ningún usuario." });
      }
      deleteImg(type, oldUser.img);

      res.json({ ok: true, oldUser });
    })
    .catch((err) => {
      deleteImg(type, fileName);
      res.status(500).json({ ok: false, err });
    });
}

function productImg(ID, fileName, type, res) {
  ProductModel.findByIdAndUpdate(ID, { img: fileName })
    .then((oldProduct) => {
      if (!oldProduct) {
        deleteImg(type, fileName);
        return res
          .status(400)
          .json({ ok: false, err: "El ID no corresponde a ningún producto." });
      }
      deleteImg(type, oldProduct.img);

      res.json({ ok: true, oldProduct });
    })
    .catch((err) => {
      deleteImg(type, fileName);
      res.status(500).json({ ok: false, err });
    });
}
module.exports = router;
