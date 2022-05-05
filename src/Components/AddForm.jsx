import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, OutlinedInput } from "@mui/material";
import { FormControl, InputLabel, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { postMenuItem } from "../http";
import PageHeader from "./PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function AddForm() {
  const location = useLocation();

  const token = location.state;

  const [values, setValues] = React.useState({
    id: 0,
    price: 0,
    desc: "",
    category: "",
    name: "",
    img: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    console.log(values.id);
    postMenuItem(values);
    setValues({
      ...values,
      id: 0,
      category: "",
      name: "",
      price: 0.0,
      desc: "",
      img: "",
    });
  }

  if (token === null) {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            display: { xs: "flex" },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              marginTop: 10,
              marginBottom: 16,
              height: 200,
              width: 650,
              alignItems: "center",
              opacity: 0.9,
            }}
          >
            <PageHeader message="Authorization Required" />
            <p>Must be authorized!</p>
          </Paper>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            display: { xs: "flex" },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              marginTop: 10,
              marginBottom: 16,
              height: 515,
              width: 600,
              alignItems: "center",
              opacity: 0.9,
            }}
          >
            <PageHeader message="Add Menu Item" />
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  marginTop: 3,
                }}
              >
                <TextField
                  required
                  inputProps={{
                    title: "Must be a value greater than 0.",
                    pattern:
                      "^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$",
                  }}
                  error={values.id <= 0 || values.id === undefined}
                  type="text"
                  id="id-field"
                  label="ID"
                  variant="outlined"
                  value={values.id}
                  onChange={handleChange("id")}
                  sx={{ marginX: 1 }}
                />
                <TextField
                  required
                  error={values.name === ""}
                  id="name-field"
                  label="Name"
                  type="text"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange("name")}
                  sx={{ marginX: 1 }}
                />
              </Grid>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  marginTop: 3,
                }}
              >
                <FormControl fullWidth sx={{ maxWidth: 230, m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    required
                    inputProps={{
                      title: "Must be in ##.## format.",
                      pattern: "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*.[0-9]{2}$",
                    }}
                    error={values.price <= 0 || values.price === undefined}
                    type="text"
                    id="price-field"
                    value={values.price}
                    onChange={handleChange("price")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Price"
                  />
                </FormControl>
                <Box sx={{ minWidth: 230, marginX: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-category">Category</InputLabel>
                    <Select
                      required
                      error={values.category === ""}
                      labelId="select-category"
                      id="select-category"
                      value={values.category}
                      label="Category"
                      onChange={handleChange("category")}
                    >
                      <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
                      <MenuItem value={"Salad"}>Salad</MenuItem>
                      <MenuItem value={"Burger"}>Burger</MenuItem>
                      <MenuItem value={"Special"}>Special</MenuItem>
                      <MenuItem value={"Dessert"}>Dessert</MenuItem>
                      <MenuItem value={"Entree"}>Entree</MenuItem>
                      <MenuItem value={"Side"}>Side</MenuItem>
                      <MenuItem value={"Drink"}>Drink</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  fullWidth
                  required
                  error={values.desc === ""}
                  multiline
                  maxRows={2}
                  id="description-field"
                  label="Description"
                  variant="outlined"
                  type="text"
                  value={values.desc}
                  onChange={handleChange("desc")}
                  sx={{ marginX: 1, marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  required
                  error={values.img === ""}
                  id="image-field"
                  label="Image Path"
                  variant="outlined"
                  type="text"
                  value={values.img}
                  onChange={handleChange("img")}
                  sx={{ marginX: 1, marginTop: 3 }}
                />
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      marginTop: 3,
                    }}
                  >
                    Submit
                  </Button>
                </ThemeProvider>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default AddForm;
