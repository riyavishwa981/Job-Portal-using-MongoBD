const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Job = mongoose.model("jobs");
const User = mongoose.model("user");
const App = mongoose.model("applied");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("job/addOrEdit", {
    viewTitle: "Add Job",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateIntoMongoDB(req, res);
});

function insertRecord(req, res) {
  var job = new Job();
  job.jobb = req.body.jobb;
  job.job_description = req.body.job_description;
  job.company_name = req.body.company_name;
  job.j_type = req.body.j_type;
  job.company_location = req.body.company_location;
  job.company_contact = req.body.company_contact;
  job.company_email_id = req.body.company_email_id;
  job.salary = req.body.salary;
  job.save((err, doc) => {
    if (!err) {
      console.log("RECORD INSTRERTED");
      res.redirect("/job/list");
    } else {
      console.log("Error during record insertion: " + err);
    }
  });
}
function updateIntoMongoDB(req, res) {
  Job.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("job/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("job/addOrEdit", {
            //Retaining value to be displayed in the child view
            viewTitle: "Update Job",
            employee: req.body,
          });
        } else console.log("Error during updating the record: " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Job.find({}).then((Jobs) => {
    res.render("job/list.hbs", {
      list: Jobs.map((job) => job.toJSON()),
    });
  });
});

router.get("/update/:id", (req, res) => {
  Job.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("job/addOrEdit", {
        viewTitle: "Update Job",
        job: doc.toJSON(),
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Job.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect("/job/list");
      } else {
        console.log("Error in deleting the job :" + err);
      }
    });
  }
});

router.get("/applyjobs/:id", (req, res) => {
  global.a_id = req.params.id;
  Job.find({}).then((Jobs) => {
    res.render("job/applyjobs.hbs", {
      list: Jobs.map((job) => job.toJSON()),
    });
  });
});

router.get("/appliedpage/:id", (req, res) => {
  Job.findById(req.params.id, (err, doc) => {
    if (!err) {
      (j_id = doc.toJSON()),
        User.findById(a_id, (err, doc) => {
          console.log(doc);
          if (!err && doc != null) {
            aval = doc.toJSON();

            var appl = new App({
              jobb: j_id.jobb,
              company_name: j_id.company_name,
              j_type: j_id.j_type,
              company_location: j_id.company_location,
              app_name: aval.fullname,
              app_email: aval.email,
            });
            appl.save((err, val) => {
              if (!err) {
                console.log(val);
              }
            });
            App.find({ app_email: aval.email }).then((Jobs) => {
              res.render("job/appliedpage", {
                j_id: j_id,
                a_id: aval,
                list: Jobs.map((job) => job.toJSON()),
              });
            });
          }
        });
    } else {
      console.log("Error in finding id for the applicant :" + err);
    }
  });
});

router.get("/signup", (req, res) => {
  res.render("job/signupApp", {
    viewTitle: "Register",
  });
});

router.post("/signup", (req, res) => {
  insertRecordApplier(req, res);
});

function insertRecordApplier(req, res) {
  var user = new User();
  user.fullname = req.body.fullname;
  user.dob = req.body.dob;
  user.college = req.body.college;
  user.experience = req.body.experience;
  user.field = req.body.field;
  user.contact = req.body.contact;
  user.email = req.body.email;
  user.bio = req.body.bio;
  user.save((err, doc) => {
    if (!err) {
      console.log("RECORD INSTRERTED");
      console.log(user);
      res.redirect("/job/applyjobs/" + doc._id);
    } else {
      console.log("Error during record insertion: " + err);
    }
  });
}

router.get("/showApp/app", (req, res) => {
  App.find({}).then((Apps) => {
    console.log(Apps);
    res.render("job/applicants.hbs", {
      list: Apps.map((app) => app.toJSON()),
    });
  });
});

router.get("/mailacc/:id", (req, res) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jobsindia483@gmail.com",
      pass: "riya@2020",
    },
  });
  let mailDetails = {
    from: "jobsindia483@gmail.com",
    to: req.params.id,
    subject: "Application Approval",
    text: "Congradulations, Your application has been approved by the admin",
  };
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (!err) {
      res.render("job/mail", {
        message: "Mail Successfully Sent To " + req.params.id,
      });
    } else {
      res.render("job/mail", {
        message:
          "Mail Could Not Be Sent To " + req.params.id + " Try Again Later",
      });
    }
  });
});

router.get("/mailrej/:id", (req, res) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jobsindia483@gmail.com",
      pass: "riya@2020",
    },
  });
  let mailDetails = {
    from: "jobsindia483@gmail.com",
    to: req.params.id,
    subject: "Application Approval",
    text: "Sorry, Your application is rejected by the admin",
  };
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (!err) {
      res.render("job/mail", {
        message: "Mail Successfully Sent To " + req.params.id,
      });
    } else {
      res.render("job/mail", {
        message:
          "Mail Could Not Be Sent To " + req.params.id + " Try Again Later",
      });
    }
  });
});
module.exports = router;
