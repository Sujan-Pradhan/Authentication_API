const express = require("express");
require("dotenv").config();

const app = express();

const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

//connect to db
const db = require("./database/connection");

//Import Routes
const authRoute = require("./routes/authRoute");

//Routes and Middleware
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/api", authRoute);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server connected to port ${port}`);
});
