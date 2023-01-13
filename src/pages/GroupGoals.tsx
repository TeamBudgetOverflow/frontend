import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import GroupGoalCard from '../components/goal/GroupGoalCard';
import NarrowGroupGoalCard from '../components/goal/NarrowGroupGoalCard';

import { userGoals, userInfo } from '../recoil/atoms';

import { IGoals } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';
import { searchBarOnFocusEvent } from '../recoil/searchAtoms';

const GroupGoals = () => {
  const { id } = useRecoilValue(userInfo);

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

  const goalCards = goals.map((goal) => (
    <GroupGoalCard key={goal.id} goal={goal} />
  ));

  const impendingGoalCard = goals.map((goal) => (
    <NarrowGroupGoalCard key={goal.id} goal={goal} />
  ));

  const searchBarOnFocusAtom = useRecoilValue(searchBarOnFocusEvent);
  console.log(searchBarOnFocusAtom);

  return (
    <>
      {searchBarOnFocusAtom ? (
        <Wrapper>
          <div>tag</div>
          <div>최근본</div>
        </Wrapper>
      ) : (
        <Wrapper>
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
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UpperWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
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
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 100%;
  padding: 8px;
  border-bottom: 2px solid;
`;

const LowerWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 50%;
`;

const GoalCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  gap: 20px;
  width: 100%;
  height: 430px;
`;

const LoadingMsg = styled.div`
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.gray400};
`;

export default GroupGoals;
