import { IconButton, Typography, Box, Grid, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import { db } from "../../firebase";
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

export default function EditCard({fid, closeEvent}) {
    const [what, setWhat] = useState("");
    const [where, setWhere] = useState("");
    const [when, setWhen] = useState("");
    const [why, setWhy] = useState("");
    const [who, setWho] = useState("");
    const [how, setHow] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "sentences");
    
    useEffect(() => {
        console.log("FID: " + fid.id);
        setWhat(fid.what);
        setWhere(fid.where);
        setWhen(fid.when);
        setWhy(fid.why);
        setWho(fid.who);
        setHow(fid.how);
    }, []);

    const handleWhatChange = (event) => {
        setWhat(event.target.value);
    };

    const handleWhereChange = (event) => {
        setWhere(event.target.value);
    };

    const handleWhenChange = (event) => {
        setWhen(event.target.value);
    };

    const handleWhyChange = (event) => {
        setWhy(event.target.value);
    };

    const handleWhoChange = (event) => {
        setWho(event.target.value);
    };

    const handleHowChange = (event) => {
        setHow(event.target.value);
    };


    const createUser = async()=> {
        const userDoc = doc(db, "sentences", fid.id);
        const newFields = {
            what: what, 
            where: where, 
            when: when, 
            why: why, 
            who: who, 
            how: how
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
                Edit Card
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
                label="What" 
                variant="outlined" 
                size="big"
                onChange={handleWhatChange}
                value={what}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="Where" 
                variant="outlined" 
                size="big"
                onChange={handleWhereChange}
                value={where}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="When" 
                variant="outlined" 
                size="big"
                onChange={handleWhenChange}
                value={when}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="Why" 
                variant="outlined" 
                size="big"
                onChange={handleWhyChange}
                value={why}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="Who" 
                variant="outlined" 
                size="big"
                onChange={handleWhoChange}
                value={who}
                sx={{minWidth: "100%"}} />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                id="outlined-basic" 
                label="How" 
                variant="outlined" 
                size="big"
                onChange={handleHowChange}
                value={how}
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