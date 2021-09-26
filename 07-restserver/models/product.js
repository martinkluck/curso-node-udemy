const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
  },
  description: {
    type: String,
  },
  in_stock: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductSchema);
