const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const usersRoute = require("./routes/users"); // Import the users route file

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Use the users route
app.use("/api/v1/users", usersRoute);

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