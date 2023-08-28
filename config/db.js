const mongoose = require("mongoose");
// const DB_URL="mongodb+srv://rnegi0598:hNSc9UrmcQ73MeJT@cluster0.j0elyxo.mongodb.net/?retryWrites=true&w=majority";
const DB_URL = "mongodb://localhost:27017";
const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "csv-viewer",
    });
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
