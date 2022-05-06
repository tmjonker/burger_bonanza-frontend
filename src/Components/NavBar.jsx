import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
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

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const pages = ["Sign-in", "Order Now", "Contact Us"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    if (user !== null) {

      localStorage.clear();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                  disableScrollLock="true"
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
                    flexGrow: 0,
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
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  disableScrollLock="true"
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {user !== null
                      ? "Sign-out"
                      : "Sign-in"}
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};
export default NavBar;
