const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "03-TASK-MANAGER",
  });
};

module.exports = connectDB;
