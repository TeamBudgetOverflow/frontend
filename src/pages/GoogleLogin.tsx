import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import jwtDecoder from 'jwt-decode';

import { userAPI } from '../apis/client';

import { userId } from '../recoil/userAtoms';

import { MyToken } from '../interfaces/interfaces';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const setUserId = useSetRecoilState(userId);
  const signup = async () => {
    try {
      if (!code) return alert('잘못된 코드를 받았습니다.');
      const data = await userAPI.getGoogleSignup(code);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      setUserId({ id: jwtDecoder<MyToken>(data.accessToken).userId });
      navigate('/home');
    } catch (e) {
      console.log('naver signup error:', e);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };
  useEffect(() => {
    signup();
  }, []);

  return <Wrapper>구글로 로그인 중입니다</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default GoogleLogin;
