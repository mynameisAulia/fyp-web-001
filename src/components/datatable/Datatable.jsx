import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {collection, getDocs, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    setIsPopupOpen(true);
    setId(id);
  };

  const handlePasswordSubmit = async () => {
    if (password === "@dmin1234") {
      try {
        await deleteDoc(doc(db, "users", id));
        setData(data.filter((item) => item.id !== id));
        setIsPopupOpen(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {isPopupOpen && (
        <div className="popup">
          <div className="popupContent">
            <div className="popupTitle">Enter Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="errorMessage">{errorMessage}</div>
            <div className="buttonContainer">
              <button onClick={handlePasswordSubmit}>Submit</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datatable;
