import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import PinNumberInputPage from '../pages/PinNumberInputPage';
import AgreementOfCollectionPersonalInfo from '../pages/AgreementOfCollectionPersonalInfo';
import PostGoal from '../pages/PostGoal';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';
import KakaoLogin from '../pages/KakaoLogin';
import GoogleLogin from '../pages/GoogleLogin';
import NaverLogin from '../pages/NaverLogin';
import Layout from './Layout';

import { userInfo } from '../recoil/atoms';

const Router = () => {
  const { isLogin } = useRecoilValue(userInfo);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={!isLogin ? <LoginPage /> : <Home />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/naverlogin' element={<NaverLogin />} />
          <Route path='/googlelogin' element={<GoogleLogin />} />
          <Route path='/pinnumber' element={<PinNumberInputPage />} />
          <Route path='/agreement' element={isLogin ? <AgreementOfCollectionPersonalInfo /> : <Navigate to='/' />} />
          <Route path='/goals/post' element={isLogin ? <PostGoal /> : <Navigate to='/' />} />
          <Route path='/goals/:id' element={isLogin ? <DetailGoal /> : <Navigate to='/' />} />
          <Route path='/goals/lookup' element={isLogin ? <GroupGoals /> : <Navigate to='/' />} />
          <Route path='/goals/lookup/search' element={isLogin ? <SearchGoals /> : <Navigate to='/' />} />
          <Route path='/users/:id' element={isLogin ? <DetailUser /> : <Navigate to='/' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
