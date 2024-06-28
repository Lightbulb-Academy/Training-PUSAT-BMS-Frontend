import "./App.css";
import AddOrUpdateBooks from "./components/addBook";
import AddUser from "./components/addUser";
import DisplayBook from "./components/displayBooks";
import DisplayUser from "./components/displayUsers";
import ErrorPage from "./components/errorPage";
import Sidebar from "./components/sidebar";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddOrUpdateBooks />} />
        <Route path="/books" element={<DisplayBook />} />
        <Route path="/books/add" element={<AddOrUpdateBooks />} />
        <Route path="/books/add/:id" element={<AddOrUpdateBooks />} />
        <Route path="/users" element={<DisplayUser />} />
        <Route path="/users/add" element={<AddUser />} />

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
