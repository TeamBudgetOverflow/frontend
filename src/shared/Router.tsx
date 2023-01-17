import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Layout from './Layout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import PinNumberInputPage from '../pages/PinNumberInputPage';
import AgreementOfCollectionPersonalInfo from '../pages/AgreementOfCollectionPersonalInfo';
import SelectType from '../pages/SelectType';
import PostGoal from '../pages/PostGoal';
import SelectAccnt from '../pages/SelectAccnt';
import CreateAccnt from '../pages/CreateAccnt';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';

import { userInfo } from '../recoil/userAtoms';

const Router = () => {
  const { isLogin } = useRecoilValue(userInfo);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={!isLogin ? <LoginPage /> : <Home />} />
          <Route path='/goals/post/type' element={<SelectType />} />
          <Route path='/goals/post/data/:type' element={<PostGoal />} />
          <Route path='/goals/post/account/choose' element={<SelectAccnt />} />
          <Route path='/goals/post/account/post' element={<CreateAccnt />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/lookup' element={<GroupGoals />} />
          <Route path='/goals/lookup/search' element={<SearchGoals />} />
          <Route path='/users/:id' element={<DetailUser />} />
          <Route path='/pinnumber' element={<PinNumberInputPage />} />
          <Route path='/agreement' element={<AgreementOfCollectionPersonalInfo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
