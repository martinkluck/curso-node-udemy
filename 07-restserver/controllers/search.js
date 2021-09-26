const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const permittedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i");

  const query = {
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  };

  const users = await User.find(query);
  const total = await User.count(query);
  return res.json({ results: users, total });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const product = await Product.findById(term)
      .populate("user", "name")
      .populate("category", "name");
    return res.json({ results: product ? [product] : [] });
  }

  const regex = new RegExp(term, "i");

  const query = {
    $or: [{ name: regex }, { description: regex }],
    $and: [{ status: true }],
  };

  const products = await Product.find(query)
    .populate("user", "name")
    .populate("category", "name");
  const total = await Product.count(query);
  return res.json({ results: products, total });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const category = await Category.findById(term);
    return res.json({ results: category ? [category] : [] });
  }

  const regex = new RegExp(term, "i");

  const query = { name: regex, status: true };

  const categories = await Category.find(query);
  const total = await Category.count(query);
  return res.json({ results: categories, total });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!permittedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${permittedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;

    case "categories":
      searchCategories(term, res);
      break;

    case "products":
      searchProducts(term, res);
      break;

    default:
      res.status(500).json({ msg: "Se me olvido hacer esta busqueda" });
      break;
  }
};

module.exports = {
  search,
};
