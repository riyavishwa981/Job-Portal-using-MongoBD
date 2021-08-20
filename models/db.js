const mongoose = require("mongoose");

conn_str =
  "mongodb://jobp_user:jobp123@cluster0-shard-00-00.xghz9.mongodb.net:27017,cluster0-shard-00-01.xghz9.mongodb.net:27017,cluster0-shard-00-02.xghz9.mongodb.net:27017/job-db?ssl=true&replicaSet=atlas-ekl5ih-shard-0&authSource=admin&retryWrites=true&w=majority";

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
