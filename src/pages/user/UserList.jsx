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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const empCollectionRef = collection(db, "users");
  const [formid, setFormid] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        password: doc.id, // Use the document ID as the password
        isActive: doc.data().timestamp && doc.data().timestamp.toDate() > new Date() - 30 * 24 * 60 * 60 * 1000 // Set isActive based on the last active time
      }))
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Enter password to delete",
      input: "password",
      inputPlaceholder: "Password",
      showCancelButton: true,
      confirmButtonText: "Delete",
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        if (password === "@Admin1234") {
          return deleteApi(id);
        } else {
          Swal.fire("Incorrect password", "Please enter the correct password.", "error");
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "users", id);
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

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ padding: "20px" }}>
            Users List
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
              getOptionLabel={(rows) => rows.username || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Users" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Username</Typography>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Password</Typography>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Date Register</Typography>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Status</Typography>
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
                    const lastActiveTime = row.timestamp && row.timestamp.toDate();
                    const isInactive = (new Date() - lastActiveTime) >  30 * 24 * 60 * 60 * 1000; // Check if inactive for more than 1month

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell align="left">
                          {row.username}
                        </TableCell>
                        <TableCell align="left">
                          {row.email}
                        </TableCell>
                        <TableCell align="left">
                          {row.password}
                        </TableCell>
                        <TableCell align="left">
                          {row.timestamp && row.timestamp.toDate().toLocaleString()}
                        </TableCell>
                        <TableCell align="left">
                          <span
                            style={{
                              color: row.isActive ? "green" : "red",
                            }}
                          >
                            {isInactive ? "Inactive" : "Active"}
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
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
