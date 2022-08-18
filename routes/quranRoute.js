const express = require("express");
const quranController = require("./../controller/quranController");
const Router = express.Router();

Router.route("/quran").get(quranController.GetQuran);
Router.route("/quran/juz/:juz").get(quranController.GetJuz);

module.exports = Router;
