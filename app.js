const express = require("express");
const QuranRoute = require("./routes/quranRoute");
const UserRoute = require("./routes/userRoute");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandling = require("./Controller/ErrorController");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/alquran/api/v1", QuranRoute);
app.use("/api/v1", UserRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server❗❗`, 404));
});
app.use(globalErrorHandling);
module.exports = app;
