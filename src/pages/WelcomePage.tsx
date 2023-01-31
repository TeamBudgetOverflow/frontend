import React, { useEffect, useInsertionEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { userProfile } from '../recoil/userAtoms';

const WelcomePage = () => {
  const navigate = useNavigate();

  const { name } = useRecoilValue(userProfile);

  //   useEffect(() => {
  //     setTimeout(() => navigate('/home'), 3000);
  //   }, []);

  return (
    <Wrapper>
      <ContentWrapper>
        <Text>
          {name} 님 <br />
          가입을 환영합니다!
        </Text>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  color: white;
  text-align: center;
  margin: 20px;
`;

export default WelcomePage;
