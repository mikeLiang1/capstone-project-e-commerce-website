import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePageGuest from './components/home/HomePageGuest';
import NavigationBar from './components/navigation/NavigationBar';
import AddProductPage from './components/add-products/AddProductPage';
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import AdminDashboardPage from './components/admin-dashboard/AdminDashboardPage';
import ItemPage from './components/item-page/ItemPage';
import MysteryBoxPage from './components/mystery-box/MysteryBoxPage';
import AdminHomePage from './components/admin-home/AdminHomePage';
import CheckoutPage from './components/checkout/CheckoutPage';
import AccountPage from './components/account/AccountPage';
import Cookies from 'js-cookie';
import { render } from '@testing-library/react';

function App() {
  const [admin, setAdmin] = useState(Cookies.get('admin'));
  const [token, setToken] = useState(Cookies.get('user'));
  const [itemId, setItemId] = useState('0');
  //const [navigationBar, setNavigationBar] = useState('');

  // useEffect(() => {
  //   if (token === Cookies.get('user') && token != undefined) {
  //     setNavigationBar(<NavigationBarUser />);
  //   } else if (admin == 'true') {
  //     setNavigationBar(<div>Admin Nav Bar</div>);
  //   } else {
  //     setNavigationBar(<NavigationBar />);
  //   }
  //   // Logouts out a user if the user's token no longer exists (e.g. if the user clears their cookies)
  //   // User must refresh the page in order for this to take effect
  //   if (Cookies.get('user') == '') {
  //     setToken('');
  //   }
  // }, [token, admin]);

  const makeAdmin = () => {
    setAdmin('true');
    Cookies.set('admin', 'true');
  };

  const removeAdmin = () => {
    setAdmin('false');
    Cookies.remove('admin');
  };

  const handleLogin = (token) => {
    setToken(token);
    Cookies.set('user', token);
  };

  const handleLogout = () => {
    // TO DO: Check that the token in the Cookie belongs to the user
    // TO DO: Logout a user from firebase
    setToken('');
    Cookies.remove('user');
  };

  return (
    <div>
      {/* <button onClick={makeAdmin}>Make Admin</button>
      <button onClick={removeAdmin}>Remove Admin</button> */}
      <Router>
        <NavigationBar admin={admin} token={token} setToken={setToken} />
        <Switch>
          <Route path='/checkout' exact component={CheckoutPage} />
          <Route path='/product/:itemId' exact component={ItemPage} />
          <Route path='/adminhome' exact component={AdminHomePage} />
          <Route path='/addproduct' exact component={AddProductPage} />
          <Route path='/admindash' exact component={AdminDashboardPage} />
          <Route
            path='/'
            exact
            component={() => <HomePageGuest token={token} />}
          />
          <Route
            path='/login'
            exact
            component={() => (
              <LoginPage token={token} handleLogin={handleLogin} />
            )}
          />
          <Route
            path='/register'
            exact
            component={() => (
              <RegisterPage token={token} handleLogin={handleLogin} />
            )}
          />
          <Route path='/mysterybox' exact component={MysteryBoxPage} />
          <Route path='/account' exact component={AccountPage} />
        </Switch>
        {/* <Footer /> */}
        {/* <NavigationBarUser /> */}
      </Router>
    </div>
  );
}

export default App;
