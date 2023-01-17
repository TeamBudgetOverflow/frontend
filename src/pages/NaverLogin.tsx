import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userAPI } from '../apis/client';

const NaverLogin = () => {
  const navigation = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    userAPI.getNaverSignup(code);
    navigation('/pinnumber');
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
