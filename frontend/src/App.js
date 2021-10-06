import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeGuest from './components/home/HomeGuest';
import NavigationBar from './components/navigation/NavigationBar';
import Login from './components/user-account/Login';
import Register from './components/user-account/Register';

function App() {
  return (
    <div>
      <Router>
        <NavigationBar/>
        <Switch>
          <Route path="/" exact component={HomeGuest}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
