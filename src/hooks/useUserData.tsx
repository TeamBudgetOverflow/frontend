import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { IUserProfile, IGoals } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

import { userGoals, userProfile } from '../recoil/userAtoms';

interface useUserDataProps {
  loginUserId: number;
  getUserId: number;
}

const useUserData = ({ loginUserId, getUserId }: useUserDataProps) => {
  const isLoginUser = loginUserId === getUserId;
  const { data: profileData } = useQuery<IUserProfile>('userProfile', () => userAPI.getUserProfile(getUserId));
  const setUserProfile = useSetRecoilState(userProfile);
  useEffect(() => {
    if (!profileData || !isLoginUser) return;
    setUserProfile(profileData);
  }, [profileData]);

  const { isLoading, data: goalsData, isError } = useQuery<IGoals>('userGoals', () => userAPI.getUserGoals(getUserId));
  const setUserGoals = useSetRecoilState(userGoals);
  useEffect(() => {
    if (!goalsData || !isLoginUser) return;
    setUserGoals(goalsData.result);
  }, [goalsData]);

  return { isLoading, isError, profileData, goalsData };
};

export default useUserData;
