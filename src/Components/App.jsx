import React from "react";
import "../App.css";
import SearchAppBar from "./SearchAppBar.jsx";
import Container from "@mui/material/Container";
import AddForm from "./AddForm";
import PageHeader from "./PageHeader";


function App() {
  return (
    <div>
      <SearchAppBar />
      <Container
        sx={{
          paddingY: 3
        }}
      >
        <PageHeader />
        <AddForm />
      </Container>
    </div>
  );
}

export default App;
