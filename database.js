const mysql = require("mysql2");
require('dotenv').config();
const dbPass = process.env.dbPass;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: dbPass,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(
    "CREATE DATABASE IF NOT EXISTS nodeProject",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");
      connection.query("USE nodeProject", function (err, result) {
        if (err) throw err;
        console.log("Database selected");
        const tables = require("./tables");
        Promise.all([
          tables.createUsersTable(),
          tables.createPresentationsTable(),
          tables.createPresentationSectionsTable(),
          tables.createPicturesTable(),
        ])
          .then(() => {
          })
          .catch((err) => {
            console.error("Error creating tables:", err);
          });
      });
    }
  );
});

module.exports = connection;
