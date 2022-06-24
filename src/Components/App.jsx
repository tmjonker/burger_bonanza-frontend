import React, { useState, useEffect } from "react";
import "../App.css";
import SignInForm from "./SignInForm.jsx";
import NavBar from "./NavBar.jsx";
import Container from "@mui/material/Container";
import AddForm from "./AddForm.jsx";
import Footer from "./Footer.jsx";
import MainPage from "./MainPage.jsx";
import Menu from "./Menu.jsx";
import ChangePassword from "./ChangePassword.jsx";
import Contact from "./Contact.jsx";
import $ from "jquery";

import { Routes, Route } from "react-router-dom";

function App() {
  const [session, setSession] = useState({
    cart: {},
  });

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {

      let cartId = JSON.parse(localStorage.getItem("cart")).id;

      $.ajax({
        type: "get",
        url: "http://localhost:8080/cart/" + cartId,
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
          setSession(data);
        },
      });
    }
  });

  return (
    <main>
      <NavBar />
      <Container
        sx={{
          paddingY: 3,
        }}
      >
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="add" element={<AddForm />} />
          <Route exact path="sign-in" element={<SignInForm />} />
          <Route exact path="menu" element={<Menu />} />
          <Route exact path="change" element={<ChangePassword />} />
          <Route exact path="contact" element={<Contact />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
