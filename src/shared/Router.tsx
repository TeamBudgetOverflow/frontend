import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import Navigation from './Navigation';
import Goals from '../pages/Goals';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/goals' element={<Goals />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
