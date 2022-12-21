const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/userController");


module.exports = () => {
  router.post("/auth/register", UserController.register);
  router.post("/auth/login", UserController.login);
  return router;
};

