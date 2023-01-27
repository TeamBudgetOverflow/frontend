import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

import { userId, userProfile } from '../recoil/userAtoms';

const useUserProfileData = ({ getUserId }: { getUserId: number }) => {
  const loginUserId = useRecoilValue(userId);
  const isLoginUser = loginUserId === userId;
  const setUserProfile = useSetRecoilState(userProfile);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: profile,
  } = useQuery<IUserProfile>('userProfile', () => userAPI.getUserProfile(getUserId), {
    onSuccess: (data) => {
      if (!isLoginUser) return;
      setUserProfile(data);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  return { isLoading, isError, profile };
};

export default useUserProfileData;