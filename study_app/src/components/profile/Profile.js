import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileByUsername, getProfileByUserID } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
  componentDidMount() {
    console.log("MOUNT")
    if (this.props.match.params.handle) {
      this.props.getProfileByUsername(this.props.match.params.handle);
    }

    if(this.props.match.params.user) {
      console.log("BY ID")
      this.props.getProfileByUserID(this.props.match.params.user)
    }

    console.log(this.props.profile.profile)
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileDisplay;

    if (loading) {
      profileDisplay = <Spinner />
    } else {
      if (profile === null) {
        profileDisplay = (
          <div>
            <h1 className="display-4">Profile Not Found</h1>
            <p>Either this user does not exist or not completed their profile!</p>
          </div>
        )
      } else {
        profileDisplay = (
          <div className="card mt-3">
            <div className="card-header bg-dark text-center text-white">
              <h1>{profile.user.name}</h1>
            </div>
            <div className="card-body">
              <table className="my-1 table table-striped table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Major</th>
                    <td>{profile.major}</td>
                  </tr>
                  <tr>
                    <th scope="row">Year</th>
                    <td>{profile.year}</td>
                  </tr>
                  <tr>
                    <th scope="row">Bio</th>
                    <td>{profile.bio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="container" style={{minHeight: '81vh'}}>
        {profileDisplay}
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByUsername: PropTypes.func.isRequired,
  getProfileByUserID: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByUsername, getProfileByUserID })(Profile);