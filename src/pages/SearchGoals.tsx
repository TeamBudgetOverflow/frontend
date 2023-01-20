import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GroupGoalCards from '../components/goal/GroupGoalCard';

import { goalApi } from '../apis/client';

import { groupGoals } from '../recoil/goalsAtoms';

import { ISearchGoal } from '../interfaces/interfaces';

const SearchGoals = () => {
  const location = useLocation();
  const setGoalsList = useSetRecoilState(groupGoals);
  const { isLoading: isLoadingGoals, data: searchGoals } = useQuery<Array<ISearchGoal>>('searchGoals', () =>
    goalApi.getGoalsByWord(location.search)
  );

  const searchGroupGoals = useRecoilValue(groupGoals);
  useEffect(() => {
    if (!searchGoals) return;
    setGoalsList(searchGoals);
  }, [searchGoals]);

  const searchGoalCards = searchGroupGoals.map((goal) => <GroupGoalCards key={goal.goalId} goal={goal} />);

  return (
    <Wrapper>
      <GoalCardsWrapper>
        {isLoadingGoals ? <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg> : searchGoalCards}
      </GoalCardsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: calc(100% - 10px);
`;

const GoalCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const LoadingMsg = styled.div`
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.gray400};
`;

export default SearchGoals;
