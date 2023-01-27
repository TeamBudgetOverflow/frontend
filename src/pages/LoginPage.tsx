import React from 'react';
import styled from 'styled-components';

import KakaoSignupButton from '../components/user/signup/KakaoSignupButton';
import NaverSignupButton from '../components/user/signup/NaverSignupButton';
import GoogleSignupButton from '../components/user/signup/GoogleSignupButton';
import Logo from '../components/common/elem/Logo';

// TODO: media query 설정
const LoginPage = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <Logo size={180} />
          <TextWrapper>
            <LogoText>혼자?함께?! 재밌게 돈모으자!</LogoText>
            <LogoText>커뮤니티형 종잣돈 만들기 챨-린지</LogoText>
            <NameText>티클모아 태산</NameText>
          </TextWrapper>
        </LogoWrapper>
        <ButtonSetWrapper>
          <KakaoSignupButton />
          <NaverSignupButton />
          <GoogleSignupButton />
        </ButtonSetWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const LogoWrapper = styled(ContentWrapper)`
  gap: 20px;
`;

const ButtonSetWrapper = styled(ContentWrapper)`
  gap: 4px;
  width: 100%;
`;

const TextWrapper = styled(ContentWrapper)`
  gap: 10px;
`;

const LogoText = styled.span`
  font: ${(props) => props.theme.captionC1};
`;

const NameText = styled.span`
  font: ${(props) => props.theme.headingH3};
  color: ${(props) => props.theme.primary600};
`;

export default LoginPage;
