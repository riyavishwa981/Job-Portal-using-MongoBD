require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const jobController = require("./controllers/jobController");
const bodyparser = require("body-parser");

const port = 8080;
var app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

app.use("/job", jobController);
app.listen(port, () => {
  console.log(`Express server started at ${port}`);
});
