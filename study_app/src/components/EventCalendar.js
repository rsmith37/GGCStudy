import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './common/Spinner';
import { getEvents } from '../actions/eventActions';
import { withRouter } from 'react-router-dom';

moment.locale("en");
const localizer = momentLocalizer(moment);

class EventCalendar extends Component {
  constructor(props) {
    super(props)
    this.onSelectEvent = this.onSelectEvent.bind(this)
  }

  componentDidMount() {
    this.props.getEvents();
  }

  onSelectEvent(e) {
    this.props.history.push(`/groups/id/${e.id}`);
  }

  render() {

    const { events, eventLoading } = this.props.event;

    let eventList = [];

    if (!(events === null || eventLoading)) {
      events.map(event => eventList.push({
        'title': event.title,
        'start': moment(event.start).toDate(),
        'end': moment(event.end).toDate(),
        'id': event._id
      }))
    }

    return (
      <div className="container" style={{ height: '90vh' }}>
        {eventLoading ? <Spinner /> :
          <Calendar
            selectable
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            onSelectEvent={this.onSelectEvent}
          />
        }
      </div>
    )
  }
}

EventCalendar.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  event: state.event
})

export default connect(mapStateToProps, { getEvents })(withRouter(EventCalendar));
