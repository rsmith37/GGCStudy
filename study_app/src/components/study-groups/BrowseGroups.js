import React from 'react';
import Search from './Search';
import Results from './Results';

const BrowseGroups = () => {
  return (
    <div className="container"> 
      <Search />
      <hr/>
      <Results />
    </div>
  )
}

export default BrowseGroups;