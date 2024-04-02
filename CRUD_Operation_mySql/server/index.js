import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "pavangr",
});

app.get("/", (req, res) => {
  res.json("Hello this is backend");
});
app.get("/employees", (req, res) => {
  const q = "SELECT * FROM EMPLOYEE";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
