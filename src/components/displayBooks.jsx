import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1
import "./displayBook.css";

function DisplayBook() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate(); // 2

    const fetchAllBooks = async () => {
        try {
            const response = await fetch("http://localhost:3000/books");
            if (!response.ok) {
                throw response
            }
            const jsonResponse = await response.json();
            setBooks(jsonResponse);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllBooks();
    }, [])

    return (
        <div className="db-container">
            <div className="db-header">
                <p className="db-title">Books</p>
                {/* 3 */}
                <button className="db-button" onClick={() => navigate("/books/add")}>+ Add New Book</button>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Year</th>
                        <th>Is Avaiblable?</th>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayBook;
