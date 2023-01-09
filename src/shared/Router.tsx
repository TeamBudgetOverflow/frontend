import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgreementOfCollectionPersonalInfo from '../pages/\bAgreementOfCollectionPersonalInfo';

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
          <Route
            path='/agreement'
            element={<AgreementOfCollectionPersonalInfo />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
