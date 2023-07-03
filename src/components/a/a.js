import "./feedbacks.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../feedbackssource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";

const Feedbacks = () => {
  const [data, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try{
        const querySnapshot = await getDocs(collection(db, "newData"));
        querySnapshot.forEach ((doc) => {
          list.push({ id: doc.id, ...doc.data()});
      });
        setFeedbacks(list);
        console.log(list)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()
  }, []);

  console.log(data);

  const handleDelete = (id) => {
    setFeedbacks(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users" style={{ textDecoration: "none" }}>
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
    <div className="feedbacks">
      <div className="feedbacksTitle">
        MySecureAwareness Feedbacks
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
    </div>
  );
};

export default Feedbacks;
