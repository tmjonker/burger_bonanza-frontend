import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, OutlinedInput } from "@mui/material";
import { FormControl, InputLabel, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import postMenuItem from "../http";
import PageHeader from "./PageHeader";

function AddForm() {
  const [values, setValues] = React.useState({
    price: 0.0,
    id: 0,
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

  return (
    <div>
      <PageHeader message="Add Menu Item" />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          elevation={3}
          sx={{ marginY: 3, height: 500, width: 600, alignItems: "center" }}
        >
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
                type="number"
                id="id-field"
                label="ID"
                variant="outlined"
                value={values.id}
                onChange={handleChange("id")}
                sx={{ marginX: 1 }}
              />
              <TextField
                required
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
                  type="number"
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
                multiline
                maxRows={5}
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
                id="image-field"
                label="Image Path"
                variant="outlined"
                type="text"
                value={values.img}
                onChange={handleChange("img")}
                sx={{ marginX: 1, marginTop: 3 }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: 3,
                }}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default AddForm;
