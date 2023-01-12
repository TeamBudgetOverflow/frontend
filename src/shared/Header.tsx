import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { Logo } from '../components/common/elem/Logo';
import SearchBar from '../components/header/SearchBar';

import { userInfo } from '../recoil/atoms';

const Header = () => {
  const { isLogin } = useRecoilValue(userInfo);

  return (
    <HeaderLayout>
      <LeftBox>
        <Logo size='small' />
        <TeamName>티끌모아 태산</TeamName>
      </LeftBox>
      <SearchBar />
      <RightBox></RightBox>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.div`
  height: 50px;
  background-color: ${(props) => props.theme.primaryMain};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const TeamName = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const RightBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export default Header;
