import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { goalApi } from '../apis/client';
import { Logo } from '../components/common/elem/Logo';
import SearchBar from '../components/header/SearchBar';
import { userInfo } from '../recoil/atoms';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin } = useRecoilValue(userInfo);

  // TODO: location 감지해서 api 호출 + 검색 결과페이지로 이동
  // TODO: search 결과 전역상태 저장
  if (location.search) {
    const { data } = useQuery('searchGoals', () =>
      goalApi.getGoalsByWord(location.search)
    );

    console.log(data);
    navigate('/goals/search');
  }

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
