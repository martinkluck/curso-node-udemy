const { response, request } = require("express");
const { Category } = require("../models");

// getCategories - paginado - total - populate
const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user"),
  ]);
  res.json({
    categories,
    total,
  });
};

// getCategory - populate
const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user");
  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.currentUser._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
};

// updateCategory
const updateCategory = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, user, status, ...data } = req.body;
  data.name = data.name.toUpperCase();
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  res.json(category);
};

// deleteCategory - status: false
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(category);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
