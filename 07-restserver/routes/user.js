const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const {
  roleIsValid,
  existEmail,
  existUserByID,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El email no es valido").isEmail(),
    check("email").custom(existEmail),
    // check("role", "No es un role válido").isIn(["ADMIN", "DEFAULT"]),
    check("role").custom(roleIsValid),
    validarCampos,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserByID),
    check("role").custom(roleIsValid),
    validarCampos,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserByID),
    validarCampos,
  ],
  deleteUser
);

module.exports = router;
