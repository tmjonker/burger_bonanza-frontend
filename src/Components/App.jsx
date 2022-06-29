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
import Cart from "./Cart.jsx";
import Register from "./Register.jsx";
import { Routes, Route } from "react-router-dom";
import Order from "./Order.jsx";

function App() {
  useEffect(() => {
    setUserCart();
  });

  const [quantity, setQuantity] = useState(0);

  const [cart, setCart] = useState({
    numItems: quantity,
    menuItems: [],
  });

  function setUserCart() {
    if (localStorage.getItem("user") !== null) {

      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;

      let shoppingCart = {
        numItems: quantity,
        menuItems: cart.menuItems
      }

      $.ajax({
        type: "post",
        headers: { Authorization: token },
        url: "http://localhost:8080/cart/" + user.username,
        data: JSON.stringify(shoppingCart),
        contentType: "application/json; charset=utf-8",
        traditional: true,

        success: function (data) {},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          localStorage.clear();
        },
      });
    }
  }

  function getUserCart() {
    if (localStorage.getItem("user") !== null) {

      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;

      $.ajax({
        type: "get",
        headers: { Authorization: token },
        url: "http://localhost:8080/cart/" + user.username,
        contentType: "application/json; charset=utf-8",
        traditional: true,

        success: function (data) {
          let cart = JSON.parse(JSON.stringify(data));
          setCart({menuItems: cart.menuItems});
          setQuantity(cart.numItems);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          localStorage.clear();
        },
      });
    }
  }

  function addToCart(item) {
    setQuantity(quantity + 1);

    setCart((prevState) => ({
      menuItems: [...prevState.menuItems, item],
    }));
  }

  function removeFromCart(item) {
    setQuantity(quantity - 1);

    setCart({ menuItems: cart.menuItems.filter((i, index) => index !== item) });
  }

  return (
    <main>
      <NavBar quantity={quantity} />
      <Container
        sx={{
          paddingY: 3,
        }}
      >
        <Routes>
          <Route exact path="/" element={<MainPage get={getUserCart} />} />
          <Route exact path="add" element={<AddForm />} />
          <Route exact path="sign-in" element={<SignInForm />} />
          <Route exact path="menu" element={<Menu add={addToCart} persist={setUserCart} />} />
          <Route exact path="change" element={<ChangePassword />} />
          <Route exact path="contact" element={<Contact />} />
          <Route
            exact
            path="cart"
            element={<Cart data={cart.menuItems} remove={removeFromCart} persist={setUserCart} />}
          />
          <Route exact path="register" element={<Register />} />
          <Route exact path="order" element={<Order data={cart.menuItems} />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
