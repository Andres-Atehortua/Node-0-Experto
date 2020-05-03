// Verificar token
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("Authorization");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ ok: false, err });
    }
    req.user = decoded.user;
    next();
  });
};

const checkRole = (req, res, next) => {
  let user = req.user;
  return user.role === "ADMIN_ROLE"
    ? next()
    : res.status(500).json({ ok: false, err: "Usuario no autorizado" });
};

module.exports = { checkToken, checkRole };
