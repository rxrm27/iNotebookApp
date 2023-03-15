//connect to database (seperate logic)
const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, console.log("Connected to Mongo Database"));
};
module.exports = connectToMongo;
