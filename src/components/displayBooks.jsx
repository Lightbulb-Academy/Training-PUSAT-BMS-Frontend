import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1
import "./displayBook.css";
import { toast } from "react-toastify";
import CustomModal from "./customModal";
import { ModalContext } from "../context/modalContext";

function DisplayBook() {
  const [books, setBooks] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { setIsOpen } = useContext(ModalContext)

  const navigate = useNavigate(); // 2

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      if (!response.ok) {
        throw response;
      }
      const jsonResponse = await response.json();
      setBooks(jsonResponse);
      // toast("Books fetched successfully!", { type: "success"});
    } catch (error) {
      console.log(error);
      toast("Failed to fetch books", { type: "error" });
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    // implement book delete
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw await response.json();
      }
      setIsOpen(false);
      fetchAllBooks();
      toast("Book deleted successfully!", { type: "success" });
    } catch (error) {
      console.log(error);
      if (error.statusCode === 400) {
        // setInfoModalOpen(true);
        // setIsOpen(false);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="db-container">
      <div className="db-header">
        <p className="db-title">Books</p>
        {/* 3 */}
        <button className="db-button" onClick={() => navigate("/books/add")}>
          + Add New Book
        </button>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Year</th>
            <th>Is Avaiblable?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.isbn}</td>
                <td>{book.year}</td>
                <td>{book.is_available ? "Yes" : "No"}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => navigate(`/books/add/${book.id}`)}
                    >
                      Edit
                    </p>
                    <p
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => {
                        setErrorMessage("")
                        setIsOpen(true);
                        setBookId(book.id);
                      }}
                    >
                      Delete
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <CustomModal
        hasDelete={!errorMessage}
        bookId={bookId}
        handleDelete={handleDelete}
      >
        {!errorMessage ? (
          <>
            <h3 className="text-base font-bold">Delete Book</h3>
            <p>Are you sure? This will delete the book permanantly</p>
          </>
        ) : (
          <>
            <p>{errorMessage}</p>
          </>
        )}
      </CustomModal>
    </div>
  );
}

export default DisplayBook;
