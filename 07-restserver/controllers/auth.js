const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { newJWT } = require("../helpers/new-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -- correo",
      });
    }
    // Verificar si es un usuario activo
    if (!usuario.status) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -- estado: false",
      });
    }
    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -- password",
      });
    }
    // Generar el JWT
    const token = await newJWT(usuario.id);
    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
