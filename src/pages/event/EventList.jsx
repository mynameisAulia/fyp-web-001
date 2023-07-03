import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography, Divider } from '@mui/material';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase";
import {collection, getDocs, query, orderBy, deleteDoc, doc} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import EditForm from './EditForm';
import { useAppStore } from '../../appStore';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EventList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const empCollectionRef = collection(db, "events");
    const [formid, setFormid] = useState("");
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(false);
    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = await getDocs(query(collection(db, "events"), orderBy("timeStamp", "desc")));
    setRows(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

    const deleteApi = async (id) => {
    const userDoc = doc(db, "events", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
        setRows([]);
      getUsers();
    }
  };

    const editData = (id, eventname, eventDesc, eventUrl) => {
    const data = {
        id: id,
        eventname: eventname,
        eventDesc: eventDesc,
        eventUrl: eventUrl
    };
    setFormid(data);
    handleEditOpen();
    };

  return (
    <>
    <div>
      <Modal
        open={editopen}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm closeEvent={handleEditClose} fid={formid}/>
        </Box>
      </Modal>
    </div>

      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ padding: "20px" }}>
            Events List
        </Typography>
        <Divider />
        <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.eventname || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Events" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <a href="events/new">
            <Button variant="contained" endIcon={<AddCircleIcon />}>
              Add
            </Button>
            </a>
          </Stack>
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Name</Typography>
                  </TableCell>
                <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Description</Typography>
                  </TableCell>
                <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">URL</Typography>
                  </TableCell>
                <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Action</Typography>
                  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell key={row.id} align="left">
                            {row.eventname}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                            {row.eventDesc}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                            {row.eventUrl}
                        </TableCell>

                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => { 
                                editData(row.id, row.eventname, row.eventDesc, row.eventUrl);
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   )}
    </>
  );
}