import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DisplayReservations() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => {
        console.error(error);
        toast("Error fetching reservations");
      });
  }, []);

  return (
    <div className="db-container">
      <div className="db-header">
        <p className="db-title">Reservation</p>
        <button
          className="db-button"
          onClick={() => navigate(`/reservations/add`)}
        >
          + Add New Reservation
        </button>
      </div>
      <div>
        {reservations.length > 0 ? (
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Book</th>
                <th>Reservation Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.user.name}</td>
                  <td>{reservation.book.title}</td>
                  <td>
                    {new Date(
                      reservation.reservation_date
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(reservation.return_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reservations found</p>
        )}
      </div>
    </div>
  );
}

export default DisplayReservations;
// import React, { useState, useEffect } from 'react';

// const DisplayReservations = () => {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/reservations')
//       .then((response) => response.json())
//       .then((data) => setReservations(data))
//       .catch((error) => console.error('Error fetching reservations:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Reservations List</h2>
//       {reservations.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>User</th>
//               <th>Book</th>
//               <th>Reservation Date</th>
//               <th>Return Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reservations.map((reservation) => (
//               <tr key={reservation.id}>
//                 <td>{reservation.id}</td>
//                 <td>{reservation.user.name}</td>
//                 <td>{reservation.book.title}</td>
//                 <td>{new Date(reservation.reservation_date).toLocaleDateString()}</td>
//                 <td>{new Date(reservation.return_date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No reservations found</p>
//       )}
//     </div>
//   );
// };

// export default DisplayReservations;
