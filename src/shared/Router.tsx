import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import PostGoal from '../pages/PostGoal';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';
import Navigation from './Navigation';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/goals/post' element={<PostGoal />} />
        <Route path='/goals/:id' element={<DetailGoal />} />
        <Route path='/goals/lookup' element={<GroupGoals />} />
        <Route path='/goals/lookup/search' element={<SearchGoals />} />
        <Route path='/users/:id' element={<DetailUser />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
