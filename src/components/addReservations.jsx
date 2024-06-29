import { useState, useEffect } from "react";

const AddOrUpdateReservation = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    // Fetch users
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch books
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          book_id: parseInt(bookId),
          reservation_date: new Date(reservationDate).toISOString(),
          return_date: new Date(returnDate).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Reservation created:", data);
      // Reset form fields
      setUserId("");
      setBookId("");
      setReservationDate("");
      setReturnDate("");
    } catch (error) {
      console.error("There was an error creating the reservation!", error);
    }
  };
  return (
    <div className="reservation-container">

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">User:</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="bookId">Book:</label>
        <select
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        >
          <option value="">Select a book</option>
          {books.filter(book => book.isAvailable).map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="reservationDate">Reservation Date:</label>
        <input
          type="datetime-local"
          id="reservationDate"
          value={reservationDate}
          onChange={(e) => setReservationDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="returnDate">Return Date:</label>
        <input
          type="datetime-local"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Reservation</button>
    </form>
    </div>
  );
};

export default AddOrUpdateReservation;
