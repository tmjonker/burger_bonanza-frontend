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

  useEffect(() => {});

  const [quantity, setQuantity] = useState(0);

  const [cart, setCart] = useState({
    numItems: quantity,
    menuItems: [],
  });

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
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="add" element={<AddForm />} />
          <Route exact path="sign-in" element={<SignInForm />} />
          <Route exact path="menu" element={<Menu add={addToCart} />} />
          <Route exact path="change" element={<ChangePassword />} />
          <Route exact path="contact" element={<Contact />} />
          <Route
            exact
            path="cart"
            element={<Cart data={cart.menuItems} remove={removeFromCart} />}
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
