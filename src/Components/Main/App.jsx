import React, { useState, useEffect } from "react";
import "../../App.css";
import SignInForm from "../Current-User/SignInForm.jsx";
import NavBar from "../Nav/NavBar.jsx";
import Container from "@mui/material/Container";
import AddForm from "../Admin/AddForm.jsx";
import Footer from "./Footer.jsx";
import MainPage from "./MainPage.jsx";
import Menu from "../Menu/Menu.jsx";
import ChangePassword from "../Current-User/ChangePassword.jsx";
import Contact from "../Contact/Contact.jsx";
import $ from "jquery";
import Cart from "../Cart/Cart.jsx";
import Register from "../New-User/Register.jsx";
import { Routes, Route } from "react-router-dom";
import CheckOut from "../Checkout/CheckOut.jsx";

function App() {
  const [quantity, setQuantity] = useState(0);

  const [cart, setCart] = useState({
    numItems: quantity,
    menuItems: [],
  });

  const [hasDuplicates, setHasDuplicates] = useState(false);

  useEffect(() => {
    // Saves user cart when quantity changes.
    setUserCart();
  }, [quantity]);

  // Saves user cart to database.
  function setUserCart() {
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;

      let shoppingCart = {
        numItems: quantity,
        menuItems: cart.menuItems,
      };

      $.ajax({
        type: "post",
        headers: { Authorization: token },
        url: "http://localhost:8081/cart/" + user.username,
        data: JSON.stringify(shoppingCart),
        contentType: "application/json; charset=utf-8",
        traditional: true,

        success: function () {
          console.log("Cart successfully saved!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          localStorage.clear();
        },
      });
    }
  }

  // Retrieves user cart from database.
  function getUserCart() {
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;

      $.ajax({
        type: "get",
        headers: { Authorization: token },
        url: "http://localhost:8081/cart/" + user.username,
        contentType: "application/json; charset=utf-8",
        traditional: true,

        success: function (data) {
          if (!data) {
            setCart({
              menuItems: [],
            });

            setQuantity(0);
            console.log("New cart created!");
            setUserCart();
          } else {
            console.log("Cart has been retrieved!");
            let cart = JSON.parse(JSON.stringify(data));
            setCart({ menuItems: cart.menuItems });
            setQuantity(cart.numItems);
          }
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

    setCart({ menuItems: cart.menuItems.filter((i, index) => index !== item)});
  }

  function clearCart() {
    setCart({ menuItems: [] });
    setQuantity(0);
  }

  return (
    <main>
      <NavBar quantity={quantity} clear={clearCart} persist={setUserCart} />
      <Container
        sx={{
          paddingY: 3,
        }}
      >
        <Routes>
          <Route exact path="/" element={<MainPage get={getUserCart} />} />
          <Route exact path="add" element={<AddForm />} />
          <Route
            exact
            path="sign-in"
            element={
              <SignInForm
                persist={setUserCart}
                get={getUserCart}
                quantity={quantity}
              />
            }
          />
          <Route
            exact
            path="menu"
            element={
              <Menu
                data={cart.menuItems}
                add={addToCart}
                persist={setUserCart}
              />
            }
          />
          <Route exact path="change" element={<ChangePassword />} />
          <Route exact path="contact" element={<Contact />} />
          <Route
            exact
            path="cart"
            element={
              <Cart
                duplicates={hasDuplicates}
                data={cart.menuItems}
                remove={removeFromCart}
                persist={setUserCart}
              />
            }
          />
          <Route exact path="register" element={<Register />} />
          <Route
            exact
            path="order"
            element={
              <CheckOut
                data={cart.menuItems}
                remove={removeFromCart}
                persist={setUserCart}
              />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;