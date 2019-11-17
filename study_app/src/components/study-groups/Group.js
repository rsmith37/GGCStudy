import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getEventById, attendMeeting, unattendMeeting } from '../../actions/eventActions';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Group extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getEventById(this.props.match.params.id);
    }
  }

  evalAttendance(attendees) {
    const { auth } = this.props;

    if (attendees.filter(attendee => attendee.user._id === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onClickAttend(id) {
    this.props.attendMeeting(id);
  }

  onClickUnattend(id) {
    this.props.unattendMeeting(id);
  }

  render() {
    const { event, eventLoading } = this.props.event;

    let display;

    if (eventLoading) {
      display = <Spinner />
    } else {
      if (event === null) {
        display = <h1>Event meeting not found</h1>
      } else {
        display = (
          <div className="card">
            <div className="card-header bg-dark text-white text-center">
              <h1>Study Group Meeting Details</h1>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row">Title</th>
                    <td>{event.title}</td>
                  </tr>
                  <tr>
                    <th scope="row">Subject</th>
                    <td>{event.subject}</td>
                  </tr>
                  <tr>
                    <th scope="row">Start Time</th>
                    <td>{moment(event.start).format('LLL')}</td>
                  </tr>
                  <tr>
                    <th scope="row">End Time</th>
                    <td>{moment(event.end).format('LLL')}</td>
                  </tr>
                  <tr>
                    <th scope="row">Location</th>
                    <td>{event.location}</td>
                  </tr>
                  <tr>
                    <th scope="row">Meeting Creator</th>
                    <td><Link to={`/profile/user/${event.user}`}>{event.name}</Link></td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <div className="col text-left">
                  <ul className="list-group">
                    <li className="list-group-item font-weight-bold">Current Attendees:</li>
                    { event.attendees.map(attendee => (
                      <li className="list-group-item"><Link to={`/profile/user/${attendee.user._id}`}>{attendee.user.name}</Link></li>
                    ))}
                  </ul>
                </div>
                <div className="col text-center">
                  { this.evalAttendance(event.attendees) ? 
                    <button className="btn btn-lg btn-danger" onClick={this.onClickUnattend.bind(this, event._id)}>Leave Meeting</button>
                    : 
                    <button className="btn btn-lg btn-success" onClick={this.onClickAttend.bind(this, event._id)}>Join Meeting</button>  
                  }
                </div>
              </div>

            </div>
            
          </div>
        )
      }
    }

    return (
      <div className="container">
        {display}
      </div>
    )
  }
}

Group.propTypes = {
  getEventById: PropTypes.func.isRequired,
  attendMeeting: PropTypes.func.isRequired,
  unattendMeeting: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
})

export default connect(mapStateToProps, { getEventById, attendMeeting, unattendMeeting })(Group);
