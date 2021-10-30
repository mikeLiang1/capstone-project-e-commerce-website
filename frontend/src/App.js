import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePageGuest from "./components/home/HomePageGuest";
import NavigationBar from "./components/navigation/NavigationBar";
import AddProductPage from "./components/add-products/AddProductPage";
import LoginPage from "./components/authentication/LoginPage";
import RegisterPage from "./components/authentication/RegisterPage";
import AdminDashboardPage from "./components/admin-dashboard/AdminDashboardPage";
import ItemPage from "./components/item-page/ItemPage";
import MysteryBoxPage from "./components/mystery-box/MysteryBoxPage";
import AdminHomePage from "./components/admin-home/AdminHomePage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import CartPage from "./components/checkout/CartPage";
import AccountPage from "./components/account/AccountPage";
import SurveyPage from "./components/survey/SurveyPage";
import PreviousOrders from "./components/account/PreviousOrders";
import Cookies from "js-cookie";
import { render } from "@testing-library/react";
import MysteryBoxOpen from "./components/mystery-box/MysteryBoxOpen";
import PaymentPopup from "./components/checkout/PaymentPopup";

function App() {
  const [admin, setAdmin] = useState(Cookies.get("admin"));
  const [token, setToken] = useState(Cookies.get("user"));
  const [itemId, setItemId] = useState("0");

  const makeAdmin = () => {
    setAdmin("true");
    Cookies.set("admin", "true");
  };

  const removeAdmin = () => {
    setAdmin("false");
    Cookies.remove("admin");
  };

  const handleLogin = (token) => {
    setToken(token);
    Cookies.set("user", token);
  };

  const handleLogout = () => {
    // TO DO: Check that the token in the Cookie belongs to the user
    // TO DO: Logout a user from firebase
    setToken("");
    Cookies.remove("user");
  };

  return (
    <div>
      {/* <button onClick={makeAdmin}>Make Admin</button>
      <button onClick={removeAdmin}>Remove Admin</button> */}
      <Router>
        <NavigationBar
          admin={admin}
          token={token}
          setToken={setToken}
          setAdmin={setAdmin}
        />
        <Switch>
          <Route
            path="/cart"
            exact
            component={() => <CartPage token={token} />}
          />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/product/:itemId" exact component={ItemPage} />
          <Route path="/adminhome" exact component={AdminHomePage} />
          <Route path="/addproduct" exact component={AddProductPage} />
          <Route path="/admindash" exact component={AdminDashboardPage} />
          <Route path="/survey" exact component={SurveyPage} />
          <Route
            path="/"
            exact
            component={() => <HomePageGuest token={token} />}
          />
          <Route
            path="/login"
            exact
            component={() => (
              <LoginPage
                token={token}
                handleLogin={handleLogin}
                setAdmin={setAdmin}
              />
            )}
          />
          <Route
            path="/register"
            exact
            component={() => (
              <RegisterPage token={token} handleLogin={handleLogin} />
            )}
          />
          <Route path="/previousorders" exact component={PreviousOrders} />
          <Route path="/mysterybox" exact component={MysteryBoxPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route
            path="/mysterybox/open/:boxName"
            exact
            component={MysteryBoxOpen}
          />
          <Route path="paymentComplete" exact component={PaymentPopup} />
        </Switch>
        {/* <Footer /> */}
        {/* <NavigationBarUser /> */}
      </Router>
    </div>
  );
}

export default App;
