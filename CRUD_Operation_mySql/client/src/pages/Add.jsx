import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Add = ({ isEdit }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!isEdit) {
      try {
        await axios.post("http://localhost:8800/books", newBook);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put("http://localhost:8800/books/" + id, newBook);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getBookData = async () => {
      const response = await axios.get("http://localhost:8800/books/" + id);
      const singleBook = response?.data?.[0];
      console.log(singleBook);
      if (response) {
        setNewBook({
          title: singleBook?.title,
          description: singleBook?.description,
          cover: singleBook?.cover,
          price: singleBook?.price,
        });
      }
    };

    if (id) {
      getBookData();
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleClick}>
        <div className="form">
          <h1>{!isEdit ? "Add New Book" : "Update book"}</h1>
          <input
            type="text"
            value={newBook?.title}
            placeholder="title"
            onChange={handleInput}
            name="title"
            required
          ></input>
          <input
            type="text"
            placeholder="description"
            value={newBook?.description}
            onChange={handleInput}
            name="description"
            required
          ></input>
          <input
            type="number"
            placeholder="price"
            onChange={handleInput}
            value={newBook?.price}
            name="price"
            required
          ></input>
          <input
            type="text"
            placeholder="cover"
            onChange={handleInput}
            value={newBook?.cover}
            name="cover"
            required
          ></input>
          <button type="submit" className="add-button">
            {isEdit ? "Update" : "Add"}
          </button>
          <button className="cancel-button" onClick={handleBack}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Add;
