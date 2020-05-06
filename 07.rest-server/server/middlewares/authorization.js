// Verificar token
const jwt = require("jsonwebtoken");

// Verificar token por headers.
const checkToken = (req, res, next) => {
  let token = req.get("Authorization");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ ok: false, err, message: "Token no válido." });
    }
    req.user = decoded.user;
    next();
  });
};
// Verificar rol
const checkRole = (req, res, next) => {
  let user = req.user;
  return user.role === "ADMIN_ROLE"
    ? next()
    : res.status(500).json({ ok: false, err: "Usuario no autorizado" });
};

// Verificar token por url para ruta img.accordion
const checkTokenUrl = (req, res, next) => {
  let token = req.query.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ ok: false, err, message: "Token no válido." });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = { checkToken, checkRole, checkTokenUrl };
