const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const DB = process.env.DATA_BASE_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected successful"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("app run on port", port);
});