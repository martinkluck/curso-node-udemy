const { response } = require("express");

const isAdmin = (req, res = response, next) => {
  if (!req.currentUser) {
    return res.status(500).json({ msg: "Se require validar el token primero" });
  }
  const { role, name } = req.currentUser;
  if (role != "ADMIN") {
    return res.status(401).json({ msg: `${name} no es administrador.` });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.currentUser) {
      return res
        .status(500)
        .json({ msg: "Se require validar el token primero" });
    }
    const { role, name } = req.currentUser;
    if (!roles.includes(req.currentUser.role)) {
      return res
        .status(401)
        .json({ msg: `${name} no tiene los permisos necesarios.` });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
