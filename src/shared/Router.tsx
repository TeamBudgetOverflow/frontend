import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import PinNumberInputPage from '../pages/PinNumberInputPage';
import AgreementOfCollectionPersonalInfo from '../pages/AgreementOfCollectionPersonalInfo';
import PostGoal from '../pages/PostGoal';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import Navigation from './Navigation';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';
import Navigation from './Navigation';

const Router = () => {
  const { isLogin } = useRecoilValue(userInfo);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={!isLogin ? <LoginPage /> : <Home />} />
          <Route path='/pinnumber' element={<PinNumberInputPage />} />
          <Route path='/agreement' element={<AgreementOfCollectionPersonalInfo />} />
          <Route path='/goals/post' element={<PostGoal />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/lookup' element={<GroupGoals />} />
          <Route path='/goals/lookup/search' element={<SearchGoals />} />
          <Route path='/users/:id' element={<DetailUser />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
