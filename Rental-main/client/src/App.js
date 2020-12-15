import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import Header from "./Layout/Header";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PropertyDetails from './components/Calculator/PropertyDetails';


if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" exact component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/dashboard" component={Dashboard} /> 
            <Route exact path="/propertyDetails/:id" component={PropertyDetails}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;