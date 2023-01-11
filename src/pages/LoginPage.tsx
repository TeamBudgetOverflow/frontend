import React from 'react';
import styled from 'styled-components';

import KakaoSignupButton from '../components/users/signup/KakaoSignupButton';
import NaverSignupButton from '../components/users/signup/NaverSignupButton';

import GoogleSignupButton from '../components/users/signup/GoogleSignupButton';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const LoginPage = () => {
  return (
    <Wrapper>
      <KakaoSignupButton />
      <NaverSignupButton />
      <GoogleSignupButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
