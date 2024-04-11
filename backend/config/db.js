const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  console.log(`Connecting to MongoDB...`);
  try {
    const conn = await mongoose.connect(process.env.DBCONNECTION);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
