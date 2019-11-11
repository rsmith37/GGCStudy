import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    const authDisplay = (
      <React.Fragment>
        <p className="lead">
          {' '}
          Welcome, {user.name}! 
          <br/>
          Go to <Link to="/groups/home">Study Groups</Link> to connect with fellow students
        </p>
      </React.Fragment>
    )

    const guestDisplay = (
      <React.Fragment>
        <p className="lead">
          {' '}
          Create and/or find study groups with fellow GGC students
        </p>
        <hr />
        <Link to="/register" className="btn btn-lg btn-success btn-block"  style={{maxWidth: '50%', margin: 'auto'}}>
          Sign Up
        </Link>
        <br/>
        <Link to="/login" className="btn btn-lg btn-light btn-block"  style={{maxWidth: '50%', margin: 'auto'}}>
          Login
        </Link>
      </React.Fragment>
    )

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">GGC Study</h1>
                {isAuthenticated ? authDisplay : guestDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);