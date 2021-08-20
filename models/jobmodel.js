const mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
  jobb: {
    type: String,
  },
  job_description: {
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
  company_email_id: {
    type: String,
  },
  company_contact: {
    type: Number,
  },
  salary: {
    type: Number,
  },
});

const jobObject = new mongoose.model("jobs", jobSchema);

exports.Job = jobObject;
