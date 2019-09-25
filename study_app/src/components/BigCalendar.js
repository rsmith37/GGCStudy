import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default class BigCalendar extends Component {
  render() {
    const myEventsList = [];

    return (
      <div style={{height:'90vh'}}>
        <Calendar 
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    )
  }
}
