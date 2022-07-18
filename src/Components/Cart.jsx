import React, { useState, useEffect } from "react";
import { Typography, Container, Paper, Grid, Button, Box } from "@mui/material";
import PageHeader from "./PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems.jsx";
import DialogBox from "./DialogBox.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function Cart(props) {

  useEffect(() => {
    props.persist();
  },[]);

  const navigate = useNavigate();
  let total = 0;

  props.data.map((item) => (total += item.price));

  const [open, setOpen] = useState(false);

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

                <DialogBox
                  open={open}
                  title="Please log in first"
                  text="You must be logged in to check out."
                  close={handleClose}
                />

              </Grid>
            </div>
          ) : null}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Cart;
