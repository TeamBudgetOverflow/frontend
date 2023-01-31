import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import RefreshLayout from './RefreshLayout';
import AuthLayout from './AuthLayout';
import Redirect from '../pages/Redirect';
import LoginPage from '../pages/LoginPage';
import KakaoLogin from '../pages/KakaoLogin';
import GoogleLogin from '../pages/GoogleLogin';
import NaverLogin from '../pages/NaverLogin';
import PinNumberPage from '../pages/PinNumberPage';
import Home from '../pages/Home';
import SelectGoalType from '../pages/SelectGoalType';
import CreateGoalData from '../pages/CreateGoalData';
import SelectAccnt from '../pages/SelectAccnt';
import CreateAccntAuto from '../pages/CreateAccntAuto';
import CreateAccntManual from '../pages/CreateAccntManual';
import PostGoal from '../pages/PostGoal';
import JoinGoal from '../pages/JoinGoal';
import AgreementOfCollectionPersonalInfo from '../pages/AgreementOfCollectionPersonalInfo';
import DetailGoal from '../pages/DetailGoal';
import ModifyGoalData from '../pages/ModifyGoalData';
import ModifyGoal from '../pages/ModifyGoal';
import LookupGoals from '../pages/LookupGoals';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';
import EditUserProfile from '../pages/EditUserProfile';
import Prepare from '../pages/Prepare';
import WelcomePage from '../pages/WelcomePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/naverlogin' element={<NaverLogin />} />
          <Route path='/googlelogin' element={<GoogleLogin />} />
          <Route path='/welcome' element={<WelcomePage />} />
        </Route>
        <Route element={<RefreshLayout />}>
          <Route path='/pinnumber' element={<PinNumberPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/agreement' element={<AgreementOfCollectionPersonalInfo />} />
          <Route path='/goals/post/type' element={<SelectGoalType />} />
          <Route path='/goals/post/data/:type' element={<CreateGoalData />} />
          <Route path='/accounts/choose' element={<SelectAccnt />} />
          <Route path='/goals/post/accounts/auto' element={<CreateAccntAuto />} />
          <Route path='/goals/:type/:goalId/accounts/auto' element={<CreateAccntAuto />} />
          <Route path='/goals/:type/:goalId/accounts/manual' element={<CreateAccntManual />} />
          <Route path='/goals/post/:accountId' element={<PostGoal />} />
          <Route path='/goals/join/:goalId/accounts/:accountId' element={<JoinGoal />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/:id/modify/data/:type' element={<ModifyGoalData />} />
          <Route path='/goals/:id/modify' element={<ModifyGoal />} />
          <Route path='/goals/lookup' element={<LookupGoals />} />
          <Route path='/goals/lookup/search' element={<SearchGoals />} />
          <Route path='/users/:id' element={<DetailUser />} />
          <Route path='/users/edit/:id' element={<EditUserProfile />} />
          <Route path='/chats' element={<Prepare />} />
        </Route>
        <Route path='/' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
