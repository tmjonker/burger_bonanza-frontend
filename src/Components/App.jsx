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

import { Routes, Route } from "react-router-dom";

function App() {

  const [quantity, setQuantity] = useState(0);

  const [cart, setCart] = useState({
    numItems : quantity,
    menuItems : [],
  });

  // useEffect(() => {
  //   if (localStorage.getItem("cart") !== null) {

  //     console.log(localStorage.getItem("quantity"));

  //     setQuantity(localStorage.getItem("quantity"));
  //     setCart(localStorage.getItem("cart"));

  //     console.log(cart.menuItems);
  //   }
  // });

  function addToCart(item) {

    setQuantity(quantity + 1);

    setCart(prevState => ({
      menuItems: [...prevState.menuItems, item]
    }));

    localStorage.setItem("cart", cart);
    localStorage.setItem("quantity", quantity);
  }

  function removeFromCart(item) {

    setQuantity(quantity - 1);

    setCart({menuItems: cart.menuItems.filter((i, index) => index !== item)});
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
          <Route exact path="cart" element={<Cart data={cart.menuItems} remove={removeFromCart} />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
