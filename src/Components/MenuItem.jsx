import { Typography, Paper, Grid} from "@mui/material";
import React from "react";

function MenuItem(props) {
  return (
    <Grid item xs={12} lg={4}>
      <Paper elevation={3}
      sx={{
          textAlign: "center",
          margin: 2,
          padding: 1
      }}>
          <img className="menu-item" src={"./" + props.img} alt="appetizer 1" />
          <Typography variant="h5" gutterBottom component="div">
              {props.name}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
              {props.price}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
              {props.description}
          </Typography>
      </Paper>
    </Grid>
  );
}

export default MenuItem;
