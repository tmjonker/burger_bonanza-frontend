import React from "react";
import "../App.css";
import SignInForm from "./SignInForm";
import NavBar from "./NavBar.jsx";
import Container from "@mui/material/Container";
import AddForm from "./AddForm.jsx";
import Footer from "./Footer.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <NavBar />
      <Container
        sx={{
          paddingY: 3,
        }}
      >
        <Routes>
          <Route exact path="add" element={<AddForm />} />
          <Route exact path="sign-in" element={<SignInForm />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
