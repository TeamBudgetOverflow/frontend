import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import PostGoal from '../pages/PostGoal';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import Navigation from './Navigation';
import SearchGoals from '../pages/SearchGoals';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/goals/post' element={<PostGoal />} />
        <Route path='/goals/:id' element={<DetailGoal />} />
        <Route path='/goals/lookup' element={<GroupGoals />} />
        <Route path='/goals/search' element={<SearchGoals />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
