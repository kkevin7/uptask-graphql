const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("DB Connect")
  } catch (error) {
    console.log("Error Mongoose: ", error);
    process.exit(1); //detener la app
  }
};

module.exports = conectarDB;
