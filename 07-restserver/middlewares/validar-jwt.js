const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No existe el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const currentUser = await User.findById(uid);
    if (!currentUser) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe",
      });
    }
    if (!currentUser.status) {
      return res.status(401).json({
        msg: "Token no valido - usuario no valido",
      });
    }
    req.currentUser = currentUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
