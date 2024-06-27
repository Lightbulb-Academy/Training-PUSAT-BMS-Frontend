import { useState } from "react";
import "./addBook.css";

function AddBook() {
const [title, setTitle] = useState("");
const [isbn, setIsbn] = useState("");
const [year, setYear] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  // convert string into number
  const yearInNumber = parseInt(year, 10);
  
  // add book
  const response = await fetch("http://localhost:3000/books", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: title, isbn: isbn,  year: yearInNumber})
  });

  const jsonResponse = await response.json();

  console.log(jsonResponse)

}


  return (
    <div className="book-container">
      <p>Back</p>
      <h1 className="title">Add New Book</h1>
      <form className="content">
        <div className="form-item">
          <label>Title</label>
          <input name="title" value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-item">
          <label>ISBN</label>
          <input name="isbn" value={isbn} type="text" onChange={(e) => setIsbn(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Year</label>
          <input name="year" value={year} type="text" onChange={(e) => setYear(e.target.value)} />
        </div>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBook;
