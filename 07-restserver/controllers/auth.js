const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { newJWT } = require("../helpers/new-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: "google_sign_in",
        img: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Estado del usuario
    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado.",
      });
    }

    // Generar el JWT    
    const token = await newJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El Token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
