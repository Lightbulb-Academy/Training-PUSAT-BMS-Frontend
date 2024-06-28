import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate(); // Access navigate function from react-router-dom

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, course, semester });

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, course, semester })
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      // Clear input fields after submit
      setName("");
      setEmail("");
      setCourse("");
      setSemester("");

      // Redirect to "/users/add" after successful submission
      navigate("/users/add");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="user-container">
      <h1 className="title">Add New User</h1>
      <form className="content" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Name</label>
          <input name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input name="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Course</label>
          <select name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select Course</option>
            <option value="bit">BIT</option>
            <option value="bca">BCA</option>
          </select>
        </div>
        <div className="form-item">
          <label>Semester</label>
          <select name="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
            <option value="fourth">Fourth</option>
            <option value="fifth">Fifth</option>
            <option value="sixth">Sixth</option>
            <option value="seventh">Seventh</option>
            <option value="eighth">Eighth</option>
          </select>
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUser;
