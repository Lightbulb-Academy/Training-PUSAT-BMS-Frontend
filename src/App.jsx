import "./App.css";
import AddBook from "./components/addBook";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="container">
      {/* Divide screen horizontally into 2 parts: sidebar and main content */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "80%" }} className="content">
        <AddBook />
      </div>
    </div>
  );
}

export default App;
