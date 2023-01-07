import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
