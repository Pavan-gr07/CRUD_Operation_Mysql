import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  console.log(newBook);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/books", newBook);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleInput}
        name="title"
      ></input>
      <input
        type="text"
        placeholder="description"
        onChange={handleInput}
        name="description"
      ></input>
      <input
        type="number"
        placeholder="price"
        onChange={handleInput}
        name="price"
      ></input>
      <input
        type="text"
        placeholder="cover"
        onChange={handleInput}
        name="cover"
      ></input>
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
