const con = require("./database");

function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      salt VARCHAR(255),
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("Users table created");
      resolve(result);
    });
  });
}

function createPresentationTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS presentations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("presentations table created");
      resolve(result);
    });
  });
}
function createPresentationSectionTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS presentation_sections (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255),
      presentation_id INT,
      sort INT,
      FOREIGN KEY (presentation_id) REFERENCES presentations(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("presentation_sections table created");
      resolve(result);
    });
  });
}
function createPicturesTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS pictures (
      id INT AUTO_INCREMENT PRIMARY KEY,
      address VARCHAR(255),
      type VARCHAR(255),
      presentation_section_id INT,
      FOREIGN KEY (presentation_section_id) REFERENCES presentation_sections(presentation_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("pictures table created");
      resolve(result);
    });
  });
}

module.exports = {
  createUsersTable,
  createPresentationTable,
  createPresentationSectionTable,
  createPicturesTable,
};