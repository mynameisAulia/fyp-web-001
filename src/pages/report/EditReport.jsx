import { IconButton, Typography, Box, Grid, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import { db } from "../../firebase";
import {collection, getDocs, updateDoc, doc} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';


export default function EditReport({fid, closeEvent}) {
    const [status, setStatus] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "newData");
    
    useEffect(() => {
        console.log("FID: " + fid.id);
        setStatus(fid.status);
    }, []);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const createUser = async()=> {
        const userDoc = doc(db, "newData", fid.id);
        const newFields = {
            status: status,
        };
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file updated", "success");
    };

    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    return(
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align="center">
                Edit Status
            </Typography>
            <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={closeEvent}
            >
            <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="Status" 
                variant="outlined" 
                size="small"
                onChange={handleStatusChange}
                value={status}
                sx={{minWidth: "100%"}} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant='h5' align="center">
                    <Button variant="contained" onClick={createUser}>
                        Submit
                    </Button>
                </Typography>
            </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    );
}