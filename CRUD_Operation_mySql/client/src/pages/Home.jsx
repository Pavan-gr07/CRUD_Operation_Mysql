import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState();
  console.log(books, "books");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books");
        setBooks(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Pavan Book Shop</h1>
      <div className="books">
        {books?.map((data, index) => {
          return (
            <div className="book" key={index}>
              {data?.cover && <img src={data?.cover} alt="cover"></img>}
              <h2>{data?.title}</h2>
              <p>{data?.description}</p>
              Price: <span>{data?.price}</span>
              <button className="delete">Delete</button>
              <button className="update">Update</button>
            </div>
          );
        })}
      </div>
      <button>
        <Link to="/add">Add New Book </Link>
      </button>
    </div>
  );
};

export default Home;
