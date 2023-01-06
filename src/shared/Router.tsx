import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import Navigation from './Navigation';
import Chat from '../pages/Chat';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat/:id' element={<Chat />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
};

export default Router;
