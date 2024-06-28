import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1
import "./displayBook.css";

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // 2

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw response;
      }
      const jsonResponse = await response.json();
      setUsers(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="db-container">
      <div className="db-header">
        <p className="db-title">Users</p>
        {/* 3 */}
        <button className="db-button" onClick={() => navigate("/users/add")}>
          + Add New User
        </button>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Semester</th>
            {/* 
                        name String
  email String @unique
  course Course
  semester Semester
                        */}
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.course}</td>
                <td>{user.semester}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayUser;
