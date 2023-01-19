import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import jwtDecoder from 'jwt-decode';

import Router from './shared/Router';

import { MyToken } from './interfaces/interfaces';

import { userInfo } from './recoil/userAtoms';

// TODO: 기존회원 핀코등 입력 생략
const App = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const setUserInfo = useSetRecoilState(userInfo);

  useEffect(() => {
    if (accessToken !== null && refreshToken !== null) {
      setUserInfo({
        id: jwtDecoder<MyToken>(accessToken).userId,
        isLogin: true,
        isAccessToken: true,
        isRefreshToken: true,
      });
    }

    if (accessToken === null && refreshToken !== null) {
      setUserInfo({
        id: 0,
        isLogin: false,
        isAccessToken: false,
        isRefreshToken: true,
      });
    }
  }, [accessToken, refreshToken]);

  return <Router />;
};

export default App;
