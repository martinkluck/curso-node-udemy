const { Category, Product } = require("../models");
const Role = require("../models/role");
const User = require("../models/user");
const roleIsValid = async (role = "") => {
  const roleExist = await Role.findOne({ name: role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no existe.`);
  }
};

const existEmail = async (email = "") => {
  // Verificar si el correo existe
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El email ${email} ya existe`);
  }
};

const existUserByID = async (id) => {
  const exist = await User.findById(id);
  if (!exist) {
    throw new Error(`El ID ${id} no existe.`);
  }
};

const categoryExist = async (id) => {
  const exist = await Category.findById(id);
  if (!exist) {
    throw new Error(`El ID ${id} no existe.`);
  }
};

const productExist = async (id) => {
  const exist = await Product.findById(id);
  if (!exist) {
    throw new Error(`El ID ${id} no existe.`);
  }
};

module.exports = {
  roleIsValid,
  existEmail,
  existUserByID,
  categoryExist,
  productExist,
};
