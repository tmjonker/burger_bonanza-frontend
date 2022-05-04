import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { signIn } from "../http.js";
import PageHeader from "./PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function SignInForm() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const token = signIn(values);
    console.log(token);
    setValues({
      ...values,
      username: "",
      password: "",
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
          sx={{ marginY: 10, height: 420, width: 400, alignItems: "center", opacity: 0.9 }}
        >
          <PageHeader message="Sign-in" />
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
              />
              <TextField
                id="password-field"
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange("password")}
                sx={{ marginX: 1, my: 3 }}
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

export default SignInForm;
