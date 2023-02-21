import React, { useState, useEffect } from "react";
import { Typography, Container, Paper, Grid, Button } from "@mui/material";
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
  }, []);

  const navigate = useNavigate();

  let total = 0;
  let duplicates = [];
  let uniqueItems = [];
  let currentCart = [];

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  function calculateTotal() {
    props.data.map((item) => (total += item.price));
  }

  function handleClick() {
    if (localStorage.getItem("user") === null) {
      handleClickOpen();
    } else {
      navigate("/order");
    }
  }

  function processDuplicates() {
    props.data.sort((a,b) => {
      if (a.id > b.id)
        return 1;
      else if (b.id > a.id) 
        return -1
      return 0;
    });

    let counter = 1;
    let index = 0;

    for (let i = 0; i < props.data.length; i++) {
      uniqueItems.push(props.data[i]);
      for (let j = i+1; j < props.data.length; j++) {
        if (props.data[i].id !== props.data[j].id) {
          duplicates[index++] = counter;
          i = j - 1;
          counter = 1;
          break;
        } 
        duplicates[index] = ++counter;
      }
      if (duplicates[index] === props.data.length) {
        uniqueItems.push(props.data[i]);
        break;
      }
      if (i === props.data.length - 1) 
        duplicates[index] = counter;
    }
  }

  function mapQuantities() {
    for (let i = 0; i < uniqueItems.length; i++) {
      currentCart[i] = {
        item: uniqueItems[i],
        quantity: duplicates[i]
      }
    }
  }

  calculateTotal();
  processDuplicates();
  mapQuantities();

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
          {currentCart.length > 0 ? (
            <CartItems data={currentCart} remove={props.remove} />
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
                  {"Total: $" + Math.round(total*100)/100}
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
