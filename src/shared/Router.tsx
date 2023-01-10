import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import AddGoal from '../pages/AddGoal';
import DetailGoal from '../pages/DetailGoal';
import Navigation from './Navigation';
import Goals from '../pages/SearchGoals';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/goal/add' element={<AddGoal />} />
        <Route path='/goal/:id' element={<DetailGoal />} />
        <Route path='/searchgoals' element={<Goals />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
