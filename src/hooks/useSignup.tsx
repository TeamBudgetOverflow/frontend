import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import jwtDecoder from 'jwt-decode';

import { userId } from '../recoil/userAtoms';

import { userAPI } from '../apis/client';

import { ISignupResponse, MyToken } from '../interfaces/interfaces';

interface useSignupProps {
  type: 'naver' | 'kakao' | 'google';
}

const useSignup = ({ type }: useSignupProps) => {
  const setAPI = () => {
    switch (type) {
      case 'naver':
        return userAPI.getNaverSignup;
      case 'kakao':
        return userAPI.getKakaoSignup;
      case 'google':
        return userAPI.getGoogleSignup;
    }
  };

  const setUserId = useSetRecoilState(userId);
  const navigate = useNavigate();
  const { mutate } = useMutation<ISignupResponse, unknown, string>('naverSignup', setAPI(), {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('isNewComer', data.newComer ? 'true' : 'false');
      localStorage.setItem('isPincodeRegistered', data.isExistPinCode ? 'true' : 'false');
      localStorage.setItem('name', data.name);
      setUserId({ id: jwtDecoder<MyToken>(data.accessToken).userId });

      if (data.newComer === true || !data.isExistPinCode) {
        return navigate('/pinnumber', { replace: true });
      } else {
        return navigate('/home');
      }
    },
    onError: (e) => {
      alert(`${type} 로그인에 실패했습니다.\n${e}\n관리자에게 문의해주세요.\nsonewdim@naver.com`);
      localStorage.clear();
    },
  });

  return { mutate };
};

export default useSignup;
