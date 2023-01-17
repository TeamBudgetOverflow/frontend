import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import UserProfile from '../components/user/UserProfile';
import MyGoalCard from '../components/goal/MyGoalCard';
import Icon from '../components/common/elem/Icon';

import { userGoals, userInfo, userProfile } from '../recoil/atoms';

import { IGoals, IUserProfile } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const Home = () => {
  const { id } = useRecoilValue(userInfo);
  const { isLoading: isLoadingProfile, data: profile } = useQuery<IUserProfile>('userProfile', () =>
    userAPI.getUserProfile(id)
  );
  const setUserProfile = useSetRecoilState(userProfile);

  useEffect(() => {
    if (!profile) return;
    setUserProfile(profile);
  }, [profile]);

  const { isLoading: isLoadingGoals, data: userGoalsData } = useQuery<IGoals>('userGoals', () =>
    userAPI.getUserGoals(id)
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
      <ContentWrapper>
        {isLoadingGoals ? (
          <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg>
        ) : (
          goals?.map((goal) => <MyGoalCard key={goal.id} goal={goal} />)
        )}
        <AddGoalBtn onClick={() => navigate('/goals/post')}>
          <IconWrapper>
            <Icon
              size={20}
              color={'gray400'}
              path='M19.3333 11.3332H11.3333V19.3332H8.66663V11.3332H0.666626V8.6665H8.66663V0.666504H11.3333V8.6665H19.3333V11.3332Z'
            />
          </IconWrapper>
        </AddGoalBtn>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.gray100};
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px;
  gap: 8px;
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
  padding: 14px 0;
  border-radius: 12px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

export default Home;
