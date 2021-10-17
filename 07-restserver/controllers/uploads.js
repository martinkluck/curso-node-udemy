const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFile = async (req, res = response) => {
  try {
    // txt, md
    // const fileName = await uploadFile(req.files, ["txt", "md"], 'textos');
    const fileName = await uploadFile(req.files, undefined, "images");
    return res.json({ fileName });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  try {
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `No existe un usuario con el ID ${id}` });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `No existe un producto con el ID ${id}` });
        }
        break;
      default:
        return res.status(500).json({ msg: "Falta validar eso" });
    }

    // Limpiar imagenes previas
    if (model.img) {
      // Hay que borrar imagen del servidor
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }

    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;

    await model.save();
    res.json(model);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updateImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  try {
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `No existe un usuario con el ID ${id}` });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `No existe un producto con el ID ${id}` });
        }
        break;
      default:
        return res.status(500).json({ msg: "Falta validar eso" });
    }

    // Limpiar imagenes previas
    if (model.img) {
      // Hay que borrar imagen del servidor
      const nameArr = model.img.split("/");
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();
    res.json(model);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const showImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  try {
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `No existe un usuario con el ID ${id}` });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: `No existe un producto con el ID ${id}` });
        }
        break;
      default:
        return res.status(500).json({ msg: "Falta validar eso" });
    }

    // Limpiar imagenes previas
    if (model.img) {
      // Hay que borrar imagen del servidor
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    }

    const pathImagen = path.join(__dirname, "../assets", "no-image.png");
    return res.sendFile(pathImagen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  loadFile,
  updateImage,
  showImage,
  updateImageCloudinary,
};
