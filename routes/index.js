const express = require("express");
const usersRoutes = require("./user");
const productsRoutes = require("./products");
const router = express.Router();


// get allproducts
module.exports = () => {
  router.use("/api", usersRoutes(), productsRoutes());
  return router;
};
