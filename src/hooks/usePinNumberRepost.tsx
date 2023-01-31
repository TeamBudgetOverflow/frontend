import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAPI } from '../apis/client';
import { userId } from '../recoil/userAtoms';

import jwtDecoder from 'jwt-decode';

import { MyToken } from '../interfaces/interfaces';

const usePinNumberRepost = (loginPinNumber: string) => {
  const setUserId = useSetRecoilState(userId);
  const navigate = useNavigate();
  const getAccessToken = async () => {
    try {
      const data = await userAPI.postAccessTokenByPinCode(loginPinNumber);
      localStorage.setItem('accessToken', data.accessToken);
      setUserId({ id: jwtDecoder<MyToken>(data.accessToken).userId });

      navigate('/home');
    } catch (e) {
      console.log('get access token error:', e);
      localStorage.removeItem('accessToken');
      setUserId({ id: 0 });
    }
  };

  return { getAccessToken };
};

export default usePinNumberRepost;
