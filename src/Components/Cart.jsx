import React from "react";
import { Container, Paper, Grid } from "@mui/material";
import PageHeader from "./PageHeader.jsx";

function Cart(props) {

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Cart" />
          </Grid>
          
        </Grid>
      </Paper>
    </Container>
  );
}

export default Cart;
