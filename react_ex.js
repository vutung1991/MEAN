const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
const PORT = 4000;

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;

  console.log("MySQL DB Connected successfully!");
});

server.get("/getEmployees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.post("/addEmployee", (req, res) => {
  const { empid, name, project } = req.body;
  const query = "INSERT INTO employees(empid, name, project) VALUES (?, ?, ?)";
  db.query(query, [empid, name, project], (err, results) => {
    if (err) throw err;
    res.json({ message: "Data added successfully!" });
  });
});
