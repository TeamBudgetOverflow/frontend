import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import PostGoal from '../pages/PostGoal';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import Navigation from './Navigation';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/goals/post' element={<PostGoal />} />
        <Route path='/goals/:id' element={<DetailGoal />} />
        <Route path='/goals/search' element={<GroupGoals />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
