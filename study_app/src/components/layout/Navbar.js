import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/events">
              {' '}
              Study Groups
          </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
              Log Out
            </a>
          </li>
        </ul>
      </React.Fragment>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign Up
        </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Log In
        </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 py-0">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <h3>GGC Study</h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggle-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStatesToProps = state => ({
  auth: state.auth
})

export default connect(mapStatesToProps, { logoutUser })(Navbar);