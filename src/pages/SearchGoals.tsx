import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';
import FilterTag from '../components/common/tag/FilterTag';
import GroupGoalCards from '../components/goal/GroupGoalCard';
import ModalBox from '../components/common/elem/ModalBox';
import FiltersModal from '../components/goal/searchFilter/FiltersModal';

import { SearchFilterType, searchFilterKR } from '../components/goal/searchFilter/FiltersModal';

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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 10px);
`;

const TagWrapper = styled.div``;

const GoalCardsWrapper = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
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
