import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data)   
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllBooks();
  }, [])
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full grid place-items-center">
      <div className="h-20 w-full bg-emerald-200 grid place-items-center text-4xl font-bold">Olosko Lib</div>
      <div className="gap-3 grid grid-cols-2 lg:grid-cols-4">
        {
          books.map(book =>(
            <div key={book.id} className="h-[300px] w-[250px] rounded-xl shadow-xl px-5 py-5">
              {
                book.cover && <img className="h-[100] w-[150]" src={book.cover} alt=""/>
              }
              <div>Title: {book.title}</div>
              <div>Book Description: {book.desc}</div>
              <div>Price: ${book.price}</div>
              <button className="px-4 py-2 rounded-full border-2 mr-4 bg-red-300" onClick={()=> handleDelete(book.id)}>Delete</button>
              <button className="px-4 py-2 rounded-full border-2 bg-blue-300"><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
          ))
        }
      </div>
      <button className="mt-2 px-6 py-3 bg-slate-300 rounded-full grid place-items-center my-5"><Link to="/Add">Add New Book</Link></button>
    </div>
  ) 
}

export default Books
