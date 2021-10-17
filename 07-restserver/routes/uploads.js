const { Router } = require("express");
const { check } = require("express-validator");
const {
  loadFile,
  showImage,
  updateImageCloudinary,
} = require("../controllers/uploads");
const { validCollections } = require("../helpers");
const { validateUploadFile } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", validateUploadFile, loadFile);

router.put(
  "/:collection/:id",
  [
    validateUploadFile,
    check("id", "No es un ID válido").isMongoId(),
    check("collection").custom((c) =>
      validCollections(c, ["users", "products"])
    ),
    validarCampos,
  ],
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("collection").custom((c) =>
      validCollections(c, ["users", "products"])
    ),
    validarCampos,
  ],
  showImage
);

module.exports = router;
