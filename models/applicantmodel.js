const mongoose = require("mongoose");

var applicantSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  dob: {
    type: String,
  },
  college: {
    type: String,
  },
  experience: {
    type: Number,
  },
  field: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const applicantObject = new mongoose.model("user", applicantSchema);

exports.User = applicantObject;
