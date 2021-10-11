import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePageGuest from './components/home/HomePageGuest';
import NavigationBar from './components/navigation/NavigationBar';
import AddProductPage from './components/add-products/AddProductPage';
import LoginPage from './components/user-account/LoginPage';
import RegisterPage from './components/user-account/RegisterPage';
import AdminDashboardPage from './components/admin-dashboard/AdminDashboardPage';
import MysteryBoxPage from './components/mystery-box/MysteryBoxPage';
import Footer from './components/footer/Footer';
import AdminHomePage from './components/admin-home/AdminHomePage';
import Cookies from 'js-cookie';

function App() {
  const [admin, setAdmin] = useState(Cookies.get('admin'));
  const [user, setUser] = useState(Cookies.get('user'));
  const [token, setToken] = useState('Default Token');

  useEffect(() => {
    console.log('Changed token');
    console.log(token);
    // Logouts out a user if the user's token no longer exists (e.g. if the user clears their cookies)
    // User must refresh the page in order for this to take effect
    if (Cookies.get('user') == '') {
      setUser('false');
    }
  }, [token]);

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
    setUser('true');
    Cookies.set('user', token);
  };

  const handleLogout = () => {
    // TO DO: Check that the token in the Cookie belongs to the user
    setUser('false');
    Cookies.remove('user');
  };

  return (
    <div>
      <button onClick={makeAdmin}>Make Admin</button>
      <button onClick={removeAdmin}>Remove Admin</button>
      <Router>
        <NavigationBar admin={admin} user={user} handleLogout={handleLogout} />
        <Switch>
          <Route path='/adminhome' exact component={AdminHomePage} />
          <Route path='/addproduct' exact component={AddProductPage} />
          <Route path='/admindash' exact component={AdminDashboardPage} />
          <Route
            path='/'
            exact
            component={() => <HomePageGuest user={user} />}
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
        </Switch>
        {/* <Footer /> */}
        {/* <NavigationBarUser /> */}
      </Router>
    </div>
  );
}

export default App;
