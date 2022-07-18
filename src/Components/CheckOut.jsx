import React, { useState, useEffect } from "react";
import { Typography, Container, Paper, Grid, Button, Box } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CartItems from "./CartItems.jsx";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function CheckOut(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#C41E3A",
      },
    },
  });

  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: ""
  });

  let total = 0;

  props.data.map((item) => (total += item.price));

  function handleChange(prop, event) {
    setValues({ ...values, [prop]: event.target.value });
  }

  // function that processes submit, calls method that sends POST request, and resets values to blank.
  function handleSubmit(event) {
    event.preventDefault();

    setValues({
      ...values,
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: ""
    });
  }

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
          marginBottom: 2,
        }}
      >
        <Grid container spacing={0} align="center" direction="column">
          <Grid item xs={12} l={12}>
            <PageHeader message="Cart" />
          </Grid>
          {props.data.length > 0 ? (
            <CartItems data={props.data} remove={props.remove} />
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              sx={{ marginBottom: 3 }}
            >
              <Grid item l={3} sx={{ padding: 1 }}>
                <Typography variant="h5" component="div">
                  Your cart is empty.
                </Typography>
              </Grid>
            </Grid>
          )}
          {props.data.length > 0 ? (
            <div>
              <Grid item xs={12} l={12}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ marginBottom: 2 }}
                >
                  {"Total: $" + total}
                </Typography>
              </Grid>
            </div>
          ) : null}
        </Grid>
      </Paper>

      <Paper
            elevation={3}
            sx={{
              marginTop: 3,
              marginBottom: 10,
              alignItems: "center",
              opacity: 0.9,
            }}
          >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              marginTop: 3,
            }}
          >
            <TextField
              id="name-field"
              label="Name"
              variant="outlined"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => handleChange("name", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="address1-field"
              label="Address Line 1"
              variant="outlined"
              type="text"
              autoComplete="address-line1"
              value={values.address1}
              onChange={(e) => handleChange("address1", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="address2-field"
              label="Address Line 2"
              variant="outlined"
              type="text"
              autoComplete="address-line2"
              value={values.address2}
              onChange={(e) => handleChange("address2", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="city-field"
              label="City"
              variant="outlined"
              type="text"
              autoComplete="address-level2"
              value={values.city}
              onChange={(e) => handleChange("city", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="state-field"
              label="State"
              variant="outlined"
              type="text"
              autoComplete="address-level1"
              value={values.state}
              onChange={(e) => handleChange("state", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="zipCode-field"
              label="Zip Code"
              variant="outlined"
              type="text"
              autoComplete="postal-code"
              value={values.zipCode}
              onChange={(e) => handleChange("ZipCode", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
          </Grid>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              marginTop: 3,
            }}
          >
            <ThemeProvider theme={theme}>
              <Button variant="contained" type="submit" sx={{marginBottom: 3}}>
                Submit
              </Button>
            </ThemeProvider>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default CheckOut;
