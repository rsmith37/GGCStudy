import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import StudyGroup from './components/study-groups/StudyGroup';
import CreateGroup from './components/study-groups/CreateGroup';
import Group from './components/study-groups/Group';
import BrowseGroups from './components/study-groups/BrowseGroups';
import Profile from './components/profile/Profile';
import NotFound from './components/common/NotFound';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token to get user data
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <div style={{minHeight: '81vh'}}>
              <Switch>
                <Route exact path="/" component={ Landing } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                {/* <Switch> */}
                  <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/groups/home" component={ StudyGroup } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/groups/create" component={ CreateGroup } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/groups/id/:id" component={ Group } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/groups/search" component={ BrowseGroups } />
                {/* </Switch> */}
                {/* <Switch> */}
                  <PrivateRoute exact path="/profile/handle/:handle" component={ Profile } />
                  <PrivateRoute exact path="/profile/user/:user" component={ Profile } />
                {/* </Switch> */}
                <Route component={ NotFound } />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}
