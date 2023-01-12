import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchGoals = () => {
  const location = useLocation();

  if (location.search) {
    console.log(location.search);
  }

  return <div>search</div>;
};

export default SearchGoals;
