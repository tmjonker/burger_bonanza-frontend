import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

const NavBar = () => {
  const pages = ["Sign-in", "Order Now", "Contact Us"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ marginRight: 3, display: { xs: "none", md: "flex" } }}
              >
                Burger Bonanza!
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu-button"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      key={page}
                      to={
                        page === "Menu"
                          ? "add"
                          : page === "Order Now"
                          ? "order"
                          : page === "Contact Us"
                          ? "contact"
                          : page === "Sign-in"
                          ? "sign-in"
                          : null
                      }
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                Burger Bonanza!
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page}
                  to={
                    page === "Order Now"
                      ? "order"
                      : page === "Contact Us"
                      ? "contact"
                      : page === "Sign-in"
                      ? "sign-in"
                      : null
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavBar;
