const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit = 15 } = req.query;
  res.json({
    message: "Get API",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const createUser = (req = request, res = response) => {
  const { name, age } = req.body;
  res.status(201).json({
    message: "post API",
    name,
    age,
  });
};

const updateUser = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    message: "put API",
    id,
  });
};

const deleteUser = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "delete API",
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
