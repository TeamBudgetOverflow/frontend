import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SelectType from '../pages/SelectType';
import PostGoal from '../pages/PostGoal';
import SelectAccnt from '../pages/SelectAccnt';
import CreateAccnt from '../pages/CreateAccnt';
import DetailGoal from '../pages/DetailGoal';
import GroupGoals from '../pages/GroupGoals';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';
import LandingPage from '../pages/LandingPage';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/goals/post/type' element={<SelectType />} />
          <Route path='/goals/post/data/:type' element={<PostGoal />} />
          <Route path='/goals/post/account/choose' element={<SelectAccnt />} />
          <Route path='/goals/post/account/post' element={<CreateAccnt />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/lookup' element={<GroupGoals />} />
          <Route path='/goals/lookup/search' element={<SearchGoals />} />
          <Route path='/users/:id' element={<DetailUser />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
