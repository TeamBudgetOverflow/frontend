import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import UserProfile from '../components/user/UserProfile';
import MyGoalCard from '../components/goal/MyGoalCard';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';
import AddGoalBtn from '../components/common/elem/btn/AddGoalBtn';

import { userId } from '../recoil/userAtoms';

import useBanksData from '../hooks/useBanksData';
import useUserGoalsData from '../hooks/useUserGoalsData';
import useBadgesData from '../hooks/useBadgesData';

import RouteChangeTracker from '../shared/RouteChangeTracker';

import { GoalStatus, GoalStatusStringtoType } from '../interfaces/interfaces';

const Home = () => {
  RouteChangeTracker();
  useBanksData();
  const { id } = useRecoilValue(userId);
  const { isLoading, isError, goals } = useUserGoalsData({ getUserId: Number(id) });
  useBadgesData();

  return (
    <Wrapper>
      <UserProfile />
      <ContentWrapper>
        {isLoading || !goals ? (
          <Alert showBgColor={true}>
            <LoadingMsg />
          </Alert>
        ) : isError ? (
          <Alert showBgColor={true}>
            <ErrorMsg />
          </Alert>
        ) : goals.filter((goal) => GoalStatusStringtoType(goal.status) !== GoalStatus.done).length === 0 ? (
          <EmptyData>
            <InfoText>{`아직 추가된 목표가 없습니다.\n첫번째 목표를 추가해보세요!`}</InfoText>
          </EmptyData>
        ) : (
          <>
            <>
              {goals
                .filter((goal) => GoalStatusStringtoType(goal.status) === GoalStatus.proceeding)
                .sort((a, b) => {
                  if (new Date(a.endDate).getTime() < new Date(b.endDate).getTime()) {
                    return -1;
                  }

                  return 0;
                })
                .map((goal) => (
                  <MyGoalCard key={goal.goalId} goal={goal} />
                ))}
            </>
            <>
              {goals
                .filter((goal) => GoalStatusStringtoType(goal.status) === GoalStatus.recruit)
                .sort((a, b) => {
                  if (new Date(a.startDate).getTime() < new Date(b.startDate).getTime()) {
                    return -1;
                  }

                  return 0;
                })
                .map((goal) => (
                  <MyGoalCard key={goal.goalId} goal={goal} />
                ))}
            </>
          </>
        )}
      </ContentWrapper>
      <AddGoalBtn />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.gray100};
`;

const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: white;
  border-radius: 12px;
`;

const InfoText = styled.div`
  text-align: center;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.primary400};
  line-height: 150%;
  white-space: pre-wrap;
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px 22px;
  gap: 8px;
  overflow-y: auto;
`;

export default Home;
