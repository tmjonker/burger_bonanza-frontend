import React, { useState, useEffect } from "react";
import { Typography, Container, Paper, Grid, Button, Box } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Cart(props) {
  const navigate = useNavigate();
  let total = 0;

  props.data.map((item) => (total += item.price));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    if (localStorage.getItem("user") === null) {
      handleClickOpen();
    } else {
      navigate("/order");
    }
  }

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
          marginBottom: 10,
        }}
      >
        <Grid container spacing={0} align="center" direction="column">
          <Grid item xs={12} l={12}>
            <PageHeader message="Cart" />
          </Grid>
          {props.data.length > 0 ? (
            props.data.map((item, index) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  sx={{ marginBottom: 3 }}
                >
                  <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
                    <img className="menu-item" src={"./" + item.img} />
                  </Grid>
                  <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item l={3} sx={{ border: 0, padding: 1, width: 600 }}>
                    <Typography variant="h5" component="div">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item l={3} sx={{ border: 0, padding: 1 }}>
                    <Typography variant="h5" component="div">
                      ${item.price}
                    </Typography>
                  </Grid>
                  <Grid item l={3} sx={{ padding: 1 }}>
                    <Button
                      style={{ color: "#C41E3A" }}
                      onClick={() => props.remove(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))
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
              <Grid item xs={12} l={12} sx={{ marginBottom: 3 }}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleClick}
                  >
                    Check Out
                  </Button>
                </ThemeProvider>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                  disableScrollLock={true}
                >
                  <DialogTitle>{"Please log in first"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      You must be logged in to check out.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </div>
          ) : null}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Cart;
