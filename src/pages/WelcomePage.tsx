import React, { useEffect, useInsertionEffect } from 'react';
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
      <ContentWrapper>
        <Text>
          {name} 님 <br />
          가입을 환영합니다!
        </Text>

        <WelcomePic />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled(Wrapper)`
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  text-align: center;
  margin: 20px;
`;

export default WelcomePage;
