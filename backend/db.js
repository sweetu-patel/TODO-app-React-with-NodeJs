const mongoose = require("mongoose");
const connectUri = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(connectUri);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

module.exports = connectToMongo;
