import { Typography, Paper, Grid, Button } from "@mui/material";
import React from "react";

function MenuItem(props) {

  return (
    <Grid item xs={12} lg={4}>
      <Paper elevation={3}
      sx={{
          textAlign: "center",
          margin: 2,
          padding: 1,
          height: 401
      }}>
          <img className="menu-item" src={"./" + props.item.img} alt="appetizer 1" />
          <Typography variant="h5" gutterBottom component="div">
              {props.item.name}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
              {props.item.price}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
              {props.item.description}
          </Typography>
          <Button onClick={() => props.add(props.item)} variant="contained" sx={{marginTop: 6}} style={{backgroundColor: "#C41E3A"}}>Add To Cart</Button>
      </Paper>
    </Grid>
  );
}

export default MenuItem;
