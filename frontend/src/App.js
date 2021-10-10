import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePageGuest from './components/home/HomePageGuest';
import NavigationBar from './components/navigation/NavigationBar';
import AddProductPage from './components/add-products/AddProductPage';
import LoginPage from './components/user-account/LoginPage';
import RegisterPage from './components/user-account/RegisterPage';
import AdminDashboardPage from './components/admin-dashboard/AdminDashboardPage';
import HomePageUser from './components/home/HomePageUser';
import Footer from './components/footer/Footer';
import AdminHomePage from './components/admin-home/AdminHomePage';
import Cookies from 'js-cookie';

function App() {
  const [user, setUser] = useState(Cookies.get('admin'));

  const makeAdmin = () => {
    setUser('true');
    Cookies.set('admin', 'true');
  };

  const removeAdmin = () => {
    setUser('false');
    Cookies.remove('admin');
  };

  return (
    <div>
      <button onClick={makeAdmin}>Make Admin</button>
      <button onClick={removeAdmin}>Remove Admin</button>
      <Router>
        <NavigationBar user={user} />
        <Switch>
          <Route path='/adminhome' exact component={AdminHomePage} />
          <Route path='/addproduct' exact component={AddProductPage} />
          <Route path='/admindash' exact component={AdminDashboardPage} />
          <Route path='/' exact component={HomePageGuest} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/register' exact component={RegisterPage} />
          <Route path='/userhome' exact component={HomePageUser} />
        </Switch>
        {/* <Footer /> */}
        {/* <NavigationBarUser /> */}
      </Router>
    </div>
  );
}

export default App;
