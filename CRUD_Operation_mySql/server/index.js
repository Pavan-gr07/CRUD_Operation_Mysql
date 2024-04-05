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

//get book by id
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE ID = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// add book by id
app.post("/books", (req, res) => {
  const bookId = uuidv4(); // Generate UUID for the book
  console.log(req.body);
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

//delete Book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books  WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});

//update
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, description, price, cover } = req.body;
  const q =
    "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?";
  const values = [title, description, price, cover, bookId];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Book updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
