import { IconButton, Typography, Box, Grid, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import { db } from "../../firebase";
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';


export default function EditForm ({fid, closeEvent}) {
    const [eventname, setName] = useState("");
    const [eventDesc, setDesc] = useState("");
    const [eventUrl, setURL] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "events");
    
    useEffect(() => {
        console.log("FID: " + fid.id);
        setName(fid.eventname);
        setDesc(fid.eventDesc);
        setURL(fid.eventUrl);
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleURLChange = (event) => {
        setURL(event.target.value);
    };


    const createUser = async()=> {
        const userDoc = doc(db, "events", fid.id);
        const newFields = {
            eventname: eventname,
            eventDesc: eventDesc,
            eventUrl: eventUrl,
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
                Edit Event
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
                label="Event Name" 
                variant="outlined" 
                size="small"
                onChange={handleNameChange}
                value={eventname}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="Event Description" 
                variant="outlined" 
                size="small"
                onChange={handleDescChange}
                value={eventDesc}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="Event URL" 
                variant="outlined" 
                size="small"
                onChange={handleURLChange}
                value={eventUrl}
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