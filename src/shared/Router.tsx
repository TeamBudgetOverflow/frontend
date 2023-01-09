import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import PinNumberInputPage from '../pages/PinNumberInputPage';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/pinnumber' element={<PinNumberInputPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
