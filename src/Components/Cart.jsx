import React from "react";
import { Typography, Container, Paper, Grid, Button, Box } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
        <Grid
          container
          spacing={0}
          align="center"
          direction="column"
        >
          <Grid item xs={12} l={12}>
            <PageHeader message="Cart" />
          </Grid>
          {props.data.map((item, index) => (
            <React.Fragment key={index}>
                <Grid container direction="row" justifyContent="center" sx={{marginBottom: 3}}>
                  <Grid item l={3} sx={{ border: 1, padding: 1, width: 150 }}>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item l={3} sx={{ border: 1, padding: 1, width: 600 }}>
                    <Typography variant="h5" component="div">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item l={3} sx={{ border: 1, padding: 1 }}>
                    <Typography variant="h5" component="div">
                      ${item.price}
                    </Typography>
                  </Grid>
                  <Grid item l={3} sx={{ padding: 1 }}>
                    <RemoveIcon onClick={() => props.remove(index)} />
                  </Grid>
                </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Cart;
