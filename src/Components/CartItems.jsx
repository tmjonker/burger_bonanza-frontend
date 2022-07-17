import React from "react";
import { Typography, Grid, Button } from "@mui/material";

function CartItems(props) {
  return props.data.map((item, index) => (
    <React.Fragment key={index}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
          <img className="cart-item" src={item.imgPath} />
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 600 }}>
          <Typography variant="h5" component="div" >
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
            onClick={() => props.remove(index)} // Removed item from cart.
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  ));
}

export default CartItems;
