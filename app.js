const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandling = require("./Controller/ErrorController");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/v1", routes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server❗❗`, 404));
});

app.use(globalErrorHandling);
module.exports = app;
