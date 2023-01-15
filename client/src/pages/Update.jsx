import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books" + bookId, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full grid place-items-center px-10">
      <form className="flex flex-col gap-3 py-10 w-2/3">
        <div className="font-semibold text-3xl grid place-items-center">
          Update New Book
        </div>
        <input
          className="rounded-xl border-2 py-2 px-4"
          type="text"
          placeholder="Book Title"
          onChange={handleChange}
          name="title"
        />
        <input
          className="rounded-xl border-2 py-2 px-4"
          type="text"
          placeholder="Book Description"
          onChange={handleChange}
          name="desc"
        />
        <input
          className="rounded-xl border-2 py-2 px-4"
          type="number"
          placeholder="Book Price"
          onChange={handleChange}
          name="price"
        />
        <input
          className="rounded-xl border-2 py-2 px-4"
          type="text"
          placeholder="Book Cover"
          onChange={handleChange}
          name="cover"
        />
        <button
          className="rounded-2xl px-4 py-2 border-2 font-semibold"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
