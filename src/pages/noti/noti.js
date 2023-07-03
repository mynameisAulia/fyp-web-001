import "./noti.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const Noti = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  return (
    <div className="noti">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Upload Events</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Event Banner: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Event Name</label>
                <input type="text" placeholder="" />
              </div>
              <div className="formInput">
                <label>Event Description</label>
                <input type="text" placeholder="" />
              </div>
              <div className="formInput">
                <label>Event Link</label>
                <input type="text" placeholder="" />
              </div>
              <button>Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noti;
