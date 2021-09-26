const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { categoryExist } = require("../helpers/db-validators");
const { validarJWT, validarCampos, hasRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categories
 */
// Obtener todas las categorias - publico
router.get("/", getCategories);
// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExist),
    validarCampos,
  ],
  getCategory
);
// Crear categoria - privado - cualquier persona con token valido
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createCategory
);
// Actualizar categoria - privado - cualquier persona con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExist),
    validarCampos,
  ],
  updateCategory
);
// Borrar categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    hasRole("ADMIN", "SUPER_ADMIN"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExist),
    validarCampos,
  ],
  deleteCategory
);

module.exports = router;
