import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const GroupItem = ({event}) => {
  return (
    <div className="card bg-dark mb-3 text-white">
      <h2 className="card-header text-center">{event.title}</h2>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col">
            <h5 className="mb-3">Subject: {event.subject}</h5>
            <h5 className="mb-3">Start Date/Time: {moment(event.start).format('LLL')}</h5>
            <h5 className="mb-3">End Date/Time: {moment(event.end).format('LLL')}</h5>
          </div>
          <div className="col">
            <Link to={`/groups/id/${event._id}`} className="btn btn-success btn-block">
              View Group
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupItem;