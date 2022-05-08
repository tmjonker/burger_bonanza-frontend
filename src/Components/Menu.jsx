import { Container, Paper, Grid } from "@mui/material";
import React from "react";
import $ from "jquery";
import MenuItem from "./MenuItem.jsx";
import PageHeader from "./PageHeader.jsx";

function Menu() {
  let menu;

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
        console.log(menu[0]);
      },
    });
  }

  function createMenuItem(menu) {
    return (
      <MenuItem
        key={menu.id}
        name={menu.name}
        price={menu.price}
        description={menu.description}
        img={menu.imagePath}
        category={menu.category}
      />
    );
  }

  getMenu();

  return (
    <Container maxWidth="xl">
      <Paper elevation={3}
      sx={{
          marginTop: 4,
          opacity: 0.9
      }}>
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Appetizers" />
          </Grid>
          {menu.map((item) => (item.id < 20 ? createMenuItem(item) : null))}
        </Grid>
      </Paper>

      <Paper elevation={3}
      sx={{
          marginTop: 4,
          marginBottom: 8,
          opacity: 0.9,
      }}>
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Salads" />
          </Grid>
          {menu.map((item) => ((item.id > 19 && item.id < 30) ? createMenuItem(item) : null))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Menu;
