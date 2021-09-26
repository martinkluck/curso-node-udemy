const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
});

module.exports = model("Role", RoleSchema);
