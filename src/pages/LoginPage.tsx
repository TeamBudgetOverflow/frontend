import React from 'react';
import styled from 'styled-components';

import KakaoSignupButton from '../components/user/signup/KakaoSignupButton';
import NaverSignupButton from '../components/user/signup/NaverSignupButton';
import GoogleSignupButton from '../components/user/signup/GoogleSignupButton';
import Logo from '../components/common/elem/Logo';
import LogoSubTitle from '../components/common/elem/LogoSubTitle';

const LoginPage = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <Logo type='large' size={180} />
          <LogoSubTitle width={180} height={90} />
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
  gap: 10px;
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px;
  gap: 8px;
`;

const LogoWrapper = styled(ContentWrapper)`
  gap: 10px;
`;

const ButtonSetWrapper = styled(ContentWrapper)`
  max-width: 370px;
  padding: 20px;
  gap: 4px;
  width: 100%;
  height: 40%;
`;

export default LoginPage;
