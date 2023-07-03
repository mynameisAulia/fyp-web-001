import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(collection(db, "events"), {
        eventname: data.eventName,
        eventDesc: data.eventDesc,
        eventUrl: data.eventUrl,
        filename: file.name,
        timeStamp: serverTimestamp(),
      });
      console.log(res);
      setSuccessMessage("Content added successfully!");
      setErrorMessage(""); // Reset error message if any
    } catch (error) {
      console.error("Error adding content: ", error);
      setSuccessMessage("");
      setErrorMessage("Failed to add content. Please try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
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
            {successMessage && <div className="successMessage">{successMessage}</div>}
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            <form onSubmit={handleAdd}>
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} onChange={handleInput} />
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="upload">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
