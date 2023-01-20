import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import GroupGoalCardSmall from '../components/goal/GroupGoalCardSmall';
import GroupGoalCard from '../components/goal/GroupGoalCard';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';

import { goalApi } from '../apis/client';

import { groupGoals } from '../recoil/goalsAtoms';

import { ISearchGoal } from '../interfaces/interfaces';

import { dDayCalculator } from '../utils/dDayCalculator';

import useLogout from '../hooks/useLogout';

const LookupGoals = () => {
  const logout = useLogout();
  const {
    isLoading: isLoadingGoals,
    data: goalsData,
    isError,
  } = useQuery<Array<ISearchGoal>>('getGoals', () =>
    goalApi.getGoals().catch((e) => {
      if (e.status === 410) {
        logout();
      }
    })
  );
  const setUserGoals = useSetRecoilState(groupGoals);
  const goals = useRecoilValue(groupGoals);
  const [impendingGoals, setImpendingGoals] = useState<Array<ISearchGoal>>([...goals]);

  useEffect(() => {
    if (!goalsData) return;

    setUserGoals(goalsData);
  }, [goalsData]);

  useEffect(() => {
    setImpendingGoals(() => {
      const impendingGoals = [...goals];

      const sorting = impendingGoals.sort(
        (a, b) => dDayCalculator(new Date(a.startDate)) - dDayCalculator(new Date(b.startDate))
      );
      return sorting;
    });
  }, [goals]);

  const goalCards = goals
    .filter((goal) => goal.headCount !== 1)
    .map((goal) => <GroupGoalCard key={goal.goalId} goal={goal} />);
  const impendingGoalCard = impendingGoals
    .filter((goal) => goal.headCount !== 1)
    .slice(0, 10)
    .map((goal) => <GroupGoalCardSmall key={goal.goalId} goal={goal} />);

  return (
    <Wrapper>
      <TopContent>
        <TitleBox>
          <SubTitle>마감임박 목표</SubTitle>
          <Button>모두보기</Button>
        </TitleBox>
        {isLoadingGoals ? (
          <AlertWrapper>
            <Alert height={150} showBgColor={true}>
              <LoadingMsg />
            </Alert>
          </AlertWrapper>
        ) : isError ? (
          <AlertWrapper>
            <Alert height={150} showBgColor={true}>
              <ErrorMsg />
            </Alert>
          </AlertWrapper>
        ) : (
          <ImpendingGoalCards>{impendingGoalCard}</ImpendingGoalCards>
        )}
      </TopContent>
      <BottomContent>
        <TitleBox>
          <SubTitle>전체 목표</SubTitle>
          <Button>추천순</Button>
        </TitleBox>
        {isLoadingGoals ? (
          <AlertWrapper>
            <Alert height={150} showBgColor={true}>
              <LoadingMsg />
            </Alert>
          </AlertWrapper>
        ) : isError ? (
          <AlertWrapper>
            <Alert height={150} showBgColor={true}>
              <ErrorMsg />
            </Alert>
          </AlertWrapper>
        ) : (
          <GoalCardsWrapper>{goalCards}</GoalCardsWrapper>
        )}
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 20px);
  overflow: hidden;
`;

const TopContent = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: calc(35% - 30px);
  border-bottom: 2px solid ${(props) => props.theme.gray200};
`;

const TitleBox = styled.div`
  padding: 0 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Button = styled.div`
  font: ${(props) => props.theme.captionC3};
`;

const ImpendingGoalCards = styled.div`
  padding: 5px 22px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: nowrap;
  width: calc(100% - 44px);
  overflow-x: auto;
`;

const BottomContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: calc(65% - 50px);
`;

const GoalCardsWrapper = styled.div`
  padding: 10px 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 44px);
  height: calc(100% - 20px);
  overflow-y: auto;
`;

const AlertWrapper = styled.div`
  padding: 0 22px;
  width: calc(100% - 44px);
`;

export default LookupGoals;
