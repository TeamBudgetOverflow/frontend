import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import styled from 'styled-components';

import GoalCards from '../components/searchGoals/goalCards/GoalCards';
import ImpendingGoalCards from '../components/searchGoals/ImpendingCardsSection/ImpendingGoalCards';

import { userGoals, userInfo } from '../recoil/atoms';

import { IUserGoals } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const Goals = () => {
  const { id } = useRecoilValue(userInfo);

  const { isLoading: isLoadingGoals, data: userGoalsData } =
    useQuery<IUserGoals>('userGoals', () => userAPI.getUserGoals(id));
  const setUserGoals = useSetRecoilState(userGoals);
  const goals = useRecoilValue(userGoals);

  useEffect(() => {
    if (!userGoalsData) return;
    setUserGoals(userGoalsData.goals);
  }, [userGoalsData]);

  const goalCards = goals.map((goal) => (
    <GoalCards key={goal.id} goal={goal} />
  ));

  const impendingGoalCard = goals.map((goal) => (
    <ImpendingGoalCards
      key={goal.id}
      title={goal.title}
      hashtag={goal.hashtag}
    />
  ));

  return (
    <div>
      <UpperWrapper>
        <UpperText>
          <Captions>마감임박 목표</Captions>
          <Captions>모두보기</Captions>
        </UpperText>
        <ImpendingGoalCardsWrapper>
          {isLoadingGoals ? (
            <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg>
          ) : (
            impendingGoalCard
          )}
        </ImpendingGoalCardsWrapper>
      </UpperWrapper>
      <LowerWrapper>
        <LowerText>
          <Captions>전체 목표</Captions>
          <Captions>전체</Captions>
        </LowerText>
        <GoalCardsWrapper>
          {isLoadingGoals ? (
            <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg>
          ) : (
            goalCards
          )}
        </GoalCardsWrapper>
      </LowerWrapper>
    </div>
  );
};

const UpperWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UpperText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LowerText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Captions = styled.span`
  font: ${(props) => props.theme.captionC1};
`;

const ImpendingGoalCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  padding: 8px;
  border-bottom: 2px solid;
`;

const LowerWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GoalCardsWrapper = styled.div`
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

export default Goals;
