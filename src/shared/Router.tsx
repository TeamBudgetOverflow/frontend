import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import RefreshLayout from './RefreshLayout';
import AuthLayout from './AuthLayout';
import Redirect from '../pages/Redirect';
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
import KakaoLogin from '../pages/KakaoLogin';
import GoogleLogin from '../pages/GoogleLogin';
import NaverLogin from '../pages/NaverLogin';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/naverlogin' element={<NaverLogin />} />
          <Route path='/googlelogin' element={<GoogleLogin />} />
        </Route>
        <Route element={<RefreshLayout />}>
          <Route path='/pinnumber' element={<PinNumberInputPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/agreement' element={<AgreementOfCollectionPersonalInfo />} />
          <Route path='/goals/post/type' element={<SelectType />} />
          <Route path='/goals/post/data/:type' element={<PostGoal />} />
          <Route path='/goals/post/account/choose' element={<SelectAccnt />} />
          <Route path='/goals/post/account/post' element={<CreateAccnt />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/lookup' element={<GroupGoals />} />
          <Route path='/goals/lookup/search' element={<SearchGoals />} />
          <Route path='/users/:id' element={<DetailUser />} />
        </Route>
        <Route path='/' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
