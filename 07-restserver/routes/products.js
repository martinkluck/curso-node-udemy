const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const { productExist, categoryExist } = require("../helpers/db-validators");
const { validarJWT, validarCampos, hasRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categories
 */
// Obtener todas las categorias - publico
router.get("/", getProducts);
// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(productExist),
    validarCampos,
  ],
  getProduct
);
// Crear categoria - privado - cualquier persona con token valido
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un ID de mongo válido").isMongoId(),
    check("category", "La categoria es obligatoria").not().isEmpty(),
    check("category").custom(categoryExist),
    validarCampos,
  ],
  createProduct
);
// Actualizar categoria - privado - cualquier persona con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(productExist),
    check("category", "No es un ID de mongo válido").isMongoId(),
    validarCampos,
  ],
  updateProduct
);
// Borrar categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    hasRole("ADMIN", "SUPER_ADMIN"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(productExist),
    validarCampos,
  ],
  deleteProduct
);

module.exports = router;
