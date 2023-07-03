import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Description } from '@mui/icons-material';

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MySecureAwareness</span>
        </Link>
      </div>

      <hr />

      <div className="center">
        <ul>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/events" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Events</span>
            </li>
          </Link>
          <Link to="/reports" style={{ textDecoration: "none" }}>
            <li>
              <Description className="icon" />
              <span>Reports</span>
            </li>
          </Link>

          <Link to="/card" style={{ textDecoration: "none" }}>
            <li>
              <ImportContactsIcon  className="icon" />
              <span>Cards</span>
            </li>
          </Link>
      
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
