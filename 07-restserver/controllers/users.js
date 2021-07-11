const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments(query);
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    users,
    total,
  });
};

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  // Guardar en DB
  await user.save();
  res.status(201).json(user);
};

const updateUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...resto } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);
  res.json(user);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // Borrado  de forma fisica
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json(user);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
