import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import UserProfile from '../components/user/UserProfile';

import { userInfo, userProfile } from '../recoil/atoms';

import { IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const Home = () => {
  const { id } = useRecoilValue(userInfo);
  const { isLoading, data: profile } = useQuery<IUserProfile>(
    'userProfile',
    () => userAPI.getUserProfile(id)
  );
  const setUserProfile = useSetRecoilState(userProfile);

  useEffect(() => {
    if (!profile) return;
    setUserProfile(profile);
  }, [profile]);

  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Home;
