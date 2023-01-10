import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import AddGoal from '../pages/AddGoal';
import DetailGoal from '../pages/DetailGoal';
import Navigation from './Navigation';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/goal/add' element={<AddGoal />} />
        <Route path='/goal/:id' element={<DetailGoal />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
