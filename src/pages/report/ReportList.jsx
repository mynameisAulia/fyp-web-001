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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase";
import {collection, getDocs, updateDoc, doc, query, orderBy} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppStore } from '../../appStore';
import emailjs from "emailjs-com";

export default function ReportList() {
  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const empCollectionRef = collection(db, "newData");
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
  const querySnapshot = await getDocs(query(collection(db, "newData"), orderBy("reportID", "desc")));
  setRows(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   const updateStatusInFirestore = async (rowId, status, email) => {
    try {
      const rowRef = doc(db, "newData", rowId);
      await updateDoc(rowRef, { status });

      // Send email to the user
      if (status === "Pending" || status === "Completed") {
        const templateParams = {
          to_email: email,
          status: status,
        };

        await emailjs.send(
          "service_2hhnj3m",
          "template_mb6rb99",
          templateParams,
          "0zR4-_1JDaJgYQmeH"
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const editData = (rowId) => {
  const selectedRow = rows.find((row) => row.id === rowId);
  const currentStatus = selectedRow.status || '';

  Swal.fire({
    title: 'Select Status',
    input: 'select',
    inputOptions: {
      '': 'N/A',
      Pending: 'Pending',
      Completed: 'Completed',
    },
    inputValue: currentStatus,
    showCancelButton: true,
    inputValidator: (value) => {
      if (value === '') {
        Swal.showValidationMessage('Status cannot be empty');
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const newStatus = result.value;
      const updatedRow = { ...selectedRow, status: newStatus };
      const updatedRows = rows.map((row) =>
        row.id === rowId ? updatedRow : row
      );
      setRows(updatedRows);
      updateStatusInFirestore(rowId, newStatus);
    }
  });
};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
           Feedback List
          </Typography>
          <Divider />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">ID</Typography>
                  </TableCell>
                <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Type</Typography>
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>
                    <Typography variant="subtitle1" fontWeight="bold">Description</Typography>
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
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell key={row.id} align="left">
                        {row.reportID}
                        </TableCell>

                        <TableCell key={row.id} align="left">
                        {row.heading}
                        </TableCell>

                        <TableCell key={row.id} align="left">
                        {row.newReport}
                        </TableCell>

                        <TableCell align="left">
                          <span style={{ color: row.status === 'Pending' ? 'red' : 'green' }}>
                            {row.status}
                          </span>
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
                                editData(row.id);
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
  );
}