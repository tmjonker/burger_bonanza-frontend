import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

function Register(props) {

    const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    username: "",
    password1: "",
    password2: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // function that processes submit, calls method that sends POST request, and resets values to blank.
  function handleSubmit(event) {
    event.preventDefault();

    register(values);

    setValues({
      ...values,
      username: "",
      password1: "",
      password2: ""
    });
  }

  function register(values) {
    const credentials = {
      username: values.username,
      password1: values.password1,
      password2: values.password2
    };

    // POST request to authenticate login information.  Token is returned by server and stored in localStorage.
    $.ajax({
      type: "post",
      url: "http://localhost:8080/register",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      traditional: true,

      success: function (data) {

        navigate("/sign-in");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Password Incorrect");
      }
    });
  }

    return (
        <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Paper
            elevation={3}
            sx={{
              marginTop: 10,
              marginBottom: 16,
              height: 500,
              width: 400,
              alignItems: "center",
              opacity: 0.9,
            }}
          >
            <PageHeader message="Register" />
            <form onSubmit={handleSubmit}>
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
                <TextField
                  id="username-field"
                  label="Username"
                  variant="outlined"
                  type="text"
                  autoComplete="username"
                  value={values.username}
                  onChange={handleChange("username")}
                  sx={{ marginX: 1, marginTop: 3 }}
                  required
                />
                <TextField
                  id="password1-field"
                  label="Password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  value={values.password1}
                  onChange={handleChange("password1")}
                  sx={{ marginX: 1, marginTop: 3 }}
                  required
                />
                <TextField
                  id="password2-field"
                  label="Verify Password"
                  variant="outlined"
                  type="password"
                  value={values.password2}
                  onChange={handleChange("password2")}
                  sx={{ marginX: 1, my: 3 }}
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
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </ThemeProvider>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    );
}

export default Register;
