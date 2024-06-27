import "./sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return(
    <div className="sidebar">
      <div className="sidebar-header">BMS</div>
      <div>
        <NavLink to="/books" className="sidebar-item">Books</NavLink>
        <NavLink to="/users" className="sidebar-item">Users</NavLink>
      </div>
    </div>
  )
}
export default Sidebar;
