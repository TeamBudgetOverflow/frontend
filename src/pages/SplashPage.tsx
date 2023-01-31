import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../components/common/elem/Logo';
import LogoTitle from '../components/common/elem/LogoTitle';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/login'), 3000);
  }, []);

  return (
    <Wrapper>
      <ContentWrapper>
        <Logo size={135} />
        <LogoTitle width={180} height={135} />
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 135px;
  gap: 10px;
`;

export default SplashPage;
