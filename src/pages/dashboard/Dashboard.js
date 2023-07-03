import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box, Container, Grid } from "@mui/material";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
//import Table from "../../components/table/Table";
import {PieChart} from "../../pages/dashboard/PieChart";

export default function Dashboard() {
  return (
    <>
      <div className="bgcolor">
        <Box height={10} />
        <Box sx={{ display: "flex", paddingRight: 20 }}>
          <Sidebar />
          <Container sx={{ p: 5, marginLeft: "0%"}}>
            <Box sx={{ marginLeft: "auto"}}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Widget type="user" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Widget type="order" />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 5 }}>
                <Chart title="User Registered" aspect={3 / 1} />
              </Box>
              <Box sx={{ marginTop: 5 }}>
              <div className="listTitle">Report Count</div>
                <PieChart />
              </Box>
            </Box>
          </Container>
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
