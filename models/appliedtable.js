const mongoose = require("mongoose");

var appliedSchema = new mongoose.Schema({
  jobb: {
    type: String,
  },
  company_name: {
    type: String,
  },
  j_type: {
    type: String,
  },
  company_location: {
    type: String,
  },
  app_name: {
    type: String,
  },
  app_email: {
    type: String,
  },
});

const appObject = new mongoose.model("applied", appliedSchema);

exports.App = appObject;
