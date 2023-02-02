import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import KakaoSignupButton from '../components/user/signup/KakaoSignupButton';
import NaverSignupButton from '../components/user/signup/NaverSignupButton';
import GoogleSignupButton from '../components/user/signup/GoogleSignupButton';
import Logo from '../components/common/elem/Logo';
import LogoSubTitle from '../components/common/elem/LogoSubTitle';
import LogoTitle from '../components/common/elem/LogoTitle';

const LoginPage = () => {
  const [isLanding, setIsLanding] = useState(false);

  useEffect(() => {
    setIsLanding(true);
    setTimeout(() => setIsLanding(false), 2000);
  }, []);
  return (
    <Wrapper>
      <LandingWrapper show={isLanding}>
        <Logo type='large' size={135} />
        <LogoTitle width={180} height={135} />
      </LandingWrapper>
      {isLanding ? (
        <></>
      ) : (
        <LoginWrapper>
          <Content>
            <LogoWrapper>
              <Logo type='large' size={180} />
              <LogoSubTitle width={180} height={90} />
            </LogoWrapper>
            <ButtonSetWrapper>
              <KakaoSignupButton />
              {/* <NaverSignupButton /> */}
              <GoogleSignupButton />
            </ButtonSetWrapper>
          </Content>
        </LoginWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 200%;
  height: 100%;
`;

const LandingWrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s;
`;

const SlideIn = keyframes`
  0% {
    right: 0;
  }
  100% {
    right: 50%;
  }
`;

const LoginWrapper = styled.div`
  position: absolute;
  padding: 0 20px;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(50% - 40px);
  height: 100%;
  gap: 10px;
  animation: ${SlideIn} 0.8s ease-in;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 180px;
  width: 100%;
`;

const LogoWrapper = styled(Content)`
  gap: 10px;
`;

const ButtonSetWrapper = styled(Content)`
  gap: 4px;
`;

export default LoginPage;
