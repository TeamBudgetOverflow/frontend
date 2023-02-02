import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DesktopLayout from '../shared/DesktopLayout';
import WelcomePic from '../components/common/elem/WelcomePic';

const WelcomePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('name');
      navigate('/home');
    }, 3000);
  }, []);

  return (
    <DesktopLayout>
      <Wrapper>
        <Text>
          {name} 님 <br />
          가입을 환영합니다!
        </Text>
        <WelcomePic />
      </Wrapper>
    </DesktopLayout>
  );
};

const Wrapper = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: calc(100% - 200px);
  background-color: white;
  overflow: hidden;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  text-align: center;
`;

export default WelcomePage;
