import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

import { userId } from '../recoil/userAtoms';

const useUserProfileEditData = ({ getUserId }: { getUserId: number }) => {
  const loginUserId = useRecoilValue(userId);
  const isLoginUser = loginUserId === userId;

  const [profileImage, setProfileImage] = useState<string>('');
  const [profileNickName, setProfileNickName] = useState<string>('홍길동');
  const [profileDesc, setProfileDesc] = useState<string>('아버지를 아버지라 부르지 못하고');

  const { isLoading, isError } = useQuery<IUserProfile>('userProfile', () => userAPI.getUserProfile(getUserId), {
    onSuccess: (data) => {
      if (!isLoginUser) return;
      setProfileImage(data.image);
      setProfileNickName(data.nickname);
      setProfileDesc(data.description);
    },
  });

  return { isLoading, isError, profileImage, profileNickName, profileDesc };
};

export default useUserProfileEditData;
