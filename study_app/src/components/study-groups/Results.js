import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetEvents } from '../../actions/eventActions';
import Spinner from '../common/Spinner';
import GroupItem from './GroupItem';

class Results extends Component {
  componentDidMount() {
    this.props.resetEvents();
  }

  render() {
    const { events, eventLoading } = this.props.event;

    let eventItems = <div>Please </div>;

    if (eventLoading) {
      eventItems = <Spinner />
    } else {
      if (events === null) {
        eventItems = <h2 className="text-center">Please provide search criteria to find study group meetings</h2>
      } else if (events.length > 0) {
        eventItems = events.map(event => (
          <GroupItem key={event._id} event={event} />
        ))
      } else {
        eventItems = <h2 className="text-center">No study groups match your criteria</h2>
      }
    }

    return (
      <div className="results">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {eventItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Results.propTypes = {
  resetEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  event: state.event,
})

export default connect(mapStateToProps, { resetEvents })(Results);