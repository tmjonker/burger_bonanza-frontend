import { Container, Paper, Grid } from "@mui/material";
import React from "react";
import $ from "jquery";
import MenuItem from "./MenuItem.jsx";
import PageHeader from "./PageHeader.jsx";

function Menu(props) {
  let menu;

  // GET request to retrieve menu items from database.
  function getMenu() {
    $.ajax({
      type: "get",
      url: "http://localhost:8080/api/menu",
      contentType: "application/json; charset=utf-8",
      async: false,
      traditional: true,

      success: function (data) {
        data = JSON.stringify(data);
        menu = JSON.parse(data);
      },
    });
  }

  // Creates a new MenuItem component to be displayed.
  function createMenuItem(menu) {
    let menuItem = {
      key: menu.id,
      name: menu.name,
      price: menu.price,
      description: menu.description,
      img: menu.imagePath,
      category: menu.category,
    };

    return (
      <MenuItem
        key={menuItem.key}
        item={menuItem}
        add={props.add}
      />
    );
  }

  getMenu(); // GET menu items from database before returning view.

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Appetizers" />
          </Grid>
          {menu.map((item) => (item.id < 20 ? createMenuItem(item) : null))}
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Salads" />
          </Grid>
          {menu.map((item) =>
            item.id > 19 && item.id < 30 ? createMenuItem(item) : null
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Menu;
