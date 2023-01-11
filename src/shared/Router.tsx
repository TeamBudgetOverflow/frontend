import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgreementOfCollectionPersonalInfo from '../pages/\bAgreementOfCollectionPersonalInfo';

import LandingPage from '../pages/LoginPage';
import PinNumberInputPage from '../pages/PinNumberInputPage';
import PostGoal from '../pages/PostGoal';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
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
          <Route path='/goals/post' element={<PostGoal />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/search' element={<GroupGoals />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
