// Verificar token
const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let token = req.get("Authorization");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ ok: false, err });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = checkToken;
