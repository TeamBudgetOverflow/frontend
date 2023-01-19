import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import jwtDecoder from 'jwt-decode';

import { userAPI } from '../apis/client';

import { userInfo } from '../recoil/userAtoms';

import { MyToken } from '../interfaces/interfaces';

const NaverLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const setUserInfo = useSetRecoilState(userInfo);
  const signup = async () => {
    try {
      if (!code) return alert('잘못된 코드를 받았습니다.');
      const data = await userAPI.getNaverSignup(code);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUserInfo({
        id: jwtDecoder<MyToken>(data.accessToken).userId,
        isLogin: true,
        isAccessToken: true,
        isRefreshToken: true,
      });
      navigate('/home');
    } catch (e) {
      console.log('naver signup error:', e);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserInfo({
        id: 0,
        isLogin: false,
        isAccessToken: false,
        isRefreshToken: false,
      });
    }
  };
  useEffect(() => {
    signup();
  }, []);

  return <Wrapper>네이버로 로그인 중입니다</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default NaverLogin;
