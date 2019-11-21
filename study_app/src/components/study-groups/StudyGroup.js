import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroupActions from './GroupActions';
import EventCalendar from '../EventCalendar';

class StudyGroup extends Component {
  render() {
    return (
      <div className="container">
        <GroupActions />
        <hr/>
        <EventCalendar />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default StudyGroup;