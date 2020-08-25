const config = require("config");
const db = config.get("mongoURL");
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mogodb is connected");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;