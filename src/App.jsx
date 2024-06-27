import "./App.css";
import AddBook from "./components/addBook";
import AddUser from "./components/addUser";
import ErrorPage from "./components/errorPage";
import Sidebar from "./components/sidebar";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddBook />} />
        <Route path="/books" element={<AddBook />} />
        <Route path="/users" element={<AddUser />} />
        {/* TODO: Add reservation path*/}

        {/* 
          Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for.
        */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="container">
      {/* Divide screen horizontally into 2 parts: sidebar and main content */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "80%" }} className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
