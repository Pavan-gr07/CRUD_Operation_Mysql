import express from "express";
import mysql from "mysql";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "library",
});
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const bookId = uuidv4(); // Generate UUID for the book
  const q =
    "INSERT INTO books (`id`, `title`,`description`,`price`,`cover`) VALUES (?)";
  const values = [
    bookId,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (error, data) => {
    if (error) return res.json(error);
    return res.json("Book is added successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
