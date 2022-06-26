import { Typography, Paper, Grid, Button, Container } from "@mui/material";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MenuItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick(item) {
    props.add(item);
    handleClickOpen();
  }

  return (
    <Grid item xs={12} lg={4}>
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          margin: 2,
          padding: 1,
          height: 401,
        }}
      >
        <img
          className="menu-item"
          src={"./" + props.item.img}
          alt="appetizer 1"
        />
        <Typography variant="h5" gutterBottom component="div">
          {props.item.name}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          {props.item.price}
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          {props.item.description}
        </Typography>
        <Button
          onClick={() => handleClick(props.item)}
          variant="contained"
          sx={{ marginTop: 6 }}
          style={{ backgroundColor: "#C41E3A" }}
        >
          Add To Cart
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          disableScrollLock={true}
        >
          <DialogTitle>{"Cart"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.item.name} has been added to your cart.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grid>
  );
}

export default MenuItem;
