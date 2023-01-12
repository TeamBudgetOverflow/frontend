import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { Logo } from '../components/common/elem/Logo';
import SearchBar from '../components/header/SearchBar';
import Icon from '../components/common/elem/Icon';

import { userInfo } from '../recoil/atoms';

const Header = () => {
  const { isLogin } = useRecoilValue(userInfo);

  const [searchBarIndicator, setSearchBarIndicator] = useState(false);

  return (
    <HeaderLayout>
      <LeftBox>
        <Logo size='small' />
        <TeamName>티끌모아 태산</TeamName>
      </LeftBox>
      <MiddleBox>{searchBarIndicator ? <SearchBar /> : <></>}</MiddleBox>
      <RightBox>
        <SearchIconWrapper>
          <Icon
            onClickHandler={() => setSearchBarIndicator(!searchBarIndicator)}>
            <path d='M10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m13.12 2.88-4.26-4.26A9.842 9.842 0 0 0 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c1.67 0 3.24-.41 4.62-1.14l4.26 4.26a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24'></path>
          </Icon>
        </SearchIconWrapper>
      </RightBox>
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
  padding: 0px 10px;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const TeamName = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const MiddleBox = styled.div`
  padding: 0px 10px;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const RightBox = styled.div`
  padding: 0px 10px;
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const SearchIconWrapper = styled.div`
  margin: 0px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

export default Header;
