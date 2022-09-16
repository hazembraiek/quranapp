const express = require("express");
const userController = require("./../controller/userConroller");
const Router = express.Router();

Router.route("/login").post(userController.login);
Router.route("/signup").post(userController.signup);
Router.route("/me").get(
  userController.protect,
  userController.getMe,
  userController.getUser
);

module.exports = Router;
