const mongoose = require("mongoose");

conn_str =//add your database's connection string
mongoose.connect(
  conn_str,
  { userNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Successful !");
    }
  }
);

require("./jobmodel");
require("./applicantmodel");
require("./appliedtable");
