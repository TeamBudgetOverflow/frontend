import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import UserProfile from '../components/user/UserProfile';
import MyGoalCard from '../components/goal/MyGoalCard';

import { userGoals, userInfo, userProfile } from '../recoil/atoms';

import { IGoals, IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const Home = () => {
  const { id } = useRecoilValue(userInfo);
  const { isLoading: isLoadingProfile, data: profile } = useQuery<IUserProfile>(
    'userProfile',
    () => userAPI.getUserProfile(id)
  );
  const setUserProfile = useSetRecoilState(userProfile);

  useEffect(() => {
    if (!profile) return;
    setUserProfile(profile);
  }, [profile]);

  const { isLoading: isLoadingGoals, data: userGoalsData } = useQuery<IGoals>(
    'userGoals',
    () => userAPI.getUserGoals(id)
  );
  const setUserGoals = useSetRecoilState(userGoals);
  const goals = useRecoilValue(userGoals);

  useEffect(() => {
    if (!userGoalsData) return;
    setUserGoals(userGoalsData.goals);
  }, [userGoalsData]);

  const navigate = useNavigate();
  return (
    <Wrapper>
      <UserProfile />
      <CardList>
        {isLoadingGoals ? (
          <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg>
        ) : (
          goals?.map((goal) => <MyGoalCard key={goal.id} goal={goal} />)
        )}
      </CardList>
      <AddGoalBtn onClick={() => navigate('/goals/post')}>
        <SVGIcon viewBox='0 0 24 24'>
          <path fill='#f18529' d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' />
        </SVGIcon>
      </AddGoalBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const LoadingMsg = styled.div`
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.gray400};
`;

const AddGoalBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.secondary200};
  :hover {
    cursor: pointer;
  }
`;

const SVGIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

export default Home;
