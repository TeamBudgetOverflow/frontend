import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import WelcomePic from '../components/common/elem/WelcomePic';

import { userProfile } from '../recoil/userAtoms';

const WelcomePage = () => {
  const navigate = useNavigate();

  const { name } = useRecoilValue(userProfile);

  useEffect(() => {
    setTimeout(() => navigate('/home'), 3000);
  }, []);

  return (
    <Wrapper>
      <Text>
        {name} 님 <br />
        가입을 환영합니다!
      </Text>
      <WelcomePic />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  top: 200px;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  text-align: center;
`;

export default WelcomePage;
