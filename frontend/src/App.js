import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePageGuest from './components/home/HomePageGuest';
import NavigationBarGuest from './components/navigation/NavigationBarGuest';
import AddProductPage from './components/add-products/AddProductPage';
import LoginPage from './components/user-account/LoginPage';
import RegisterPage from './components/user-account/RegisterPage';
import AdminDashboardPage from './components/admin-dashboard/AdminDashboardPage';
import Footer from './components/footer/Footer';
import NavigationBarUser from './components/navigation/NavigationBarUser';
import HomePageUser from './components/home/HomePageUser';

function App() {
  return (
    <div>
      <Router>
        <NavigationBarGuest />
        <Switch>
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
