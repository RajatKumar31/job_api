const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB: " + mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    console.log(`Error in connecting to DB : ${error}`);
  });
