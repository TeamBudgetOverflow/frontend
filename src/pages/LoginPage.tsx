import React from 'react';
import styled from 'styled-components';

import KakaoSignupButton from '../components/users/signup/KakaoSignupButton';
import NaverSignupButton from '../components/users/signup/NaverSignupButton';
import GoogleSignupButton from '../components/users/signup/GoogleSignupButton';
import Logo from '../components/common/elem/Logo';

// TODO: media query 설정
const LoginPage = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo size={180} />
        <LogoText>혼자?함께?! 재밌게 돈모으자!</LogoText>
        <LogoText>커뮤니티형 종잣돈 만들기 챨-린지</LogoText>
        <NameText>티클모아 태산</NameText>
      </LogoWrapper>
      <ButtonSetWrapper>
        <KakaoSignupButton />
        <NaverSignupButton />
        <GoogleSignupButton />
      </ButtonSetWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonSetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 530px;
  height: 50%;
  width: 100%;
`;

const LogoText = styled.span`
  margin: 4px;
  font: ${(props) => props.theme.paragraphsP2M};
`;

const NameText = styled.span`
  margin: 10px;
  font: ${(props) => props.theme.headingH2};
`;

export default LoginPage;
