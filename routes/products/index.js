const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/productController");
const upload = require("../../middleware/upload");


module.exports = () => {
  
  router.get("/products", ProductController.getAllProducts);
  router.get("/product/:id", ProductController.getProductById);
  router.post("/product", upload.single("image"), ProductController.addOneProduct);
  router.delete("/product/:id", ProductController.deleteOneProduct);
  router.put("/product/:id", upload.single("image"), ProductController.updateOneProduct);
  router.get("/productcount", ProductController.countProductByCategory);
  router.get("/mensproduct", ProductController.mensProductByCategory);
  router.get("/womensproduct", ProductController.womensProductByCategory);
  router.get("/electronicsproduct", ProductController.electronicsProductByCategory);
  router.get("/jeweleryproduct", ProductController.jeweleryProductByCategory);
  return router;
};