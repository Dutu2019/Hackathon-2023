const db = require("./db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");





app.listen(3001, "0.0.0.0", () => {
  console.log("Server listening");
});
