import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1
import "./displayBook.css";
import { toast } from "react-toastify";
import Modal from "react-modal";

function DisplayBookCards() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookId, setBookId] = useState(null);

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
        throw response;
      }
      setModalOpen(false);
      fetchAllBooks();
      toast("Book deleted successfully!", { type: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
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

      <div className="flex gap-4">
        {books.map((book) => {
          return (
            <div key={book.id} className={`w-[120px] h-[120px] flex flex-col rounded-md shadow-md text-center justify-around ${book.isAvailable ? "bg-white": "bg-gray-300"}`}>
              <p className="text-xl">{book.title}</p>
              <div className="flex w-full justify-center gap-2">
                <p className="text-sm">{book.isbn}</p>
                <p className="text-sm">{book.year}</p>
              </div>
              <div
                className="bg-gray-100 py-2"
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
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        setModalOpen(true);
                        setBookId(book.id);
                    }}
                    >
                      Delete
                    </p>
                  </div>
            </div>
          );
        })}
      </div>
      <Modal isOpen={isModalOpen} style={customStyles} ariaHideApp={false}>
        <h3>Are you sure? This will delete the book permanantly.</h3>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: "red", cursor: "pointer" }}
            onClick={() => handleDelete(bookId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DisplayBookCards;
