import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/material";
import EventList from "./EventList";

export default function Events() {
    return(
        <>
            <div className="bgcolor">
                <Box height={10} />
                <Box sx={{ display: "flex", paddingRight: 5}}>
                    <Sidebar />
                    <Box component="main" sx={{ flexGrow: 1, p:5}}>
                    <EventList />
                    </Box>
                </Box>
            </div>
            <style>
        {`
          .sidebar {
            flex: 0 0 17%; /* Adjust the width as needed */
            max-width: 17%; /* Adjust the max-width as needed */
          }

          .main {
            flex: 0 0 80%; /* Adjust the width as needed */
            max-width: 80%; /* Adjust the max-width as needed */
          }
        `}
      </style>
        </>
    );
}