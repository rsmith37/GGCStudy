import React from 'react';
import { Link } from 'react-router-dom';

const GroupActions = () => {
  return (
    <div className="my-3 text-center">
      <Link to="/groups/create"  className="btn-lg btn-success btn-block"  style={{maxWidth: '50%', margin: 'auto'}}>
        Create New Study Group
      </Link>
      <br/>
      <Link to="/groups/search" className="btn-lg btn-secondary btn-block"  style={{maxWidth: '50%', margin: 'auto'}}>
        Search For Study Group
      </Link>
    </div>
  )
}

export default GroupActions;