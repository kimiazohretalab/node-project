const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
require('dotenv').config();
const usersRoute = require("./routes/users");
const presentationsRoute = require("./routes/presentations");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use the users route
app.use("/api/v1/", usersRoute);
app.use("/api/v1/presentations", presentationsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  db.end((err) => {
    if (err) console.error(err);
    console.log("MySQL connection closed.");
    process.exit();
  });
});