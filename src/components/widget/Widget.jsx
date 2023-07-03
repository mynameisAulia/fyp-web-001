import "./widget.scss";
import { useEffect, useState } from 'react';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Description } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Widget = ({ type }) => {
  const [userData, setUserData] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch number of users from the 'users' collection
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const userCount = snapshot.size;
      setUserData(userCount);
    };

    // Fetch number of reports from the 'newData' collection
    const fetchReports = async () => {
      const reportsRef = collection(db, 'newData');
      const snapshot = await getDocs(reportsRef);
      const reportCount = snapshot.size;
      setReportData(reportCount);
    };

    fetchUsers();
    fetchReports();
  }, []);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        to: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        amount: userData,
      };
      break;
    case "order":
      data = {
        title: "REPORTS",
        isMoney: false,
        link: "View all reports",
        to: "/reports",
        icon: (
          <Description
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        amount: reportData,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <Link to={data.to} className="link">{data.link}</Link>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
