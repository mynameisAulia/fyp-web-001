import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Trial = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant="h5">Widget 1</Typography>
            <Typography>Widget content goes here</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant="h5">Widget 2</Typography>
            <Typography>Widget content goes here</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant="h5">Widget 3</Typography>
            <Typography>Widget content goes here</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h5">Large Widget</Typography>
            <Typography>Large widget content goes here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Trial;
