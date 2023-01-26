import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GroupGoalCards from '../components/goal/GroupGoalCard';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import Alert from '../components/common/alert/Alert';
import ErrorMsg from '../components/common/elem/ErrorMsg';
import ModalBox from '../components/common/elem/ModalBox';
import SearchFilterSetter from '../components/goal/searchFilter/SearchFilterSetter';

import { goalApi } from '../apis/client';

import { ISearchGoal } from '../interfaces/interfaces';

import { showSearchFilters } from '../recoil/goalsAtoms';
import {
  filterConditionsStatus,
  filterConditionsAimingAmount,
  filterConditionsPeriod,
  filterConditionsHeadCount,
} from '../recoil/searchAtoms';

import { dateCalculator } from '../utils/dateTranslator';

enum SearchFilterType {
  status,
  goalAmount,
  period,
  headCount,
  none,
}

const searchFilters = [
  SearchFilterType.status,
  SearchFilterType.goalAmount,
  SearchFilterType.period,
  SearchFilterType.headCount,
];

const searchFilterKR = (filterType: SearchFilterType) => {
  switch (filterType) {
    case SearchFilterType.status:
      return '진행상태';
    case SearchFilterType.goalAmount:
      return '목표금액';
    case SearchFilterType.period:
      return '진행기간';
    case SearchFilterType.headCount:
      return '모집인원';
    default:
      return '';
  }
};

const SearchGoals = () => {
  const location = useLocation();

  const [searchFilterType, setSearchFilterType] = useState<SearchFilterType>(SearchFilterType.none);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<ISearchGoal>>([]);

  const [filterdResultsStatus, setFilterdResultsStatus] = useState<Array<ISearchGoal>>([]);
  const [filterdResultsAmount, setFilterdResultsAmount] = useState<Array<ISearchGoal>>([]);
  const [filterdResultsPeriod, setFilterdResultsPeriod] = useState<Array<ISearchGoal>>([]);
  const [filterdResultsHeadCount, setFilterdResultsHeadCount] = useState<Array<ISearchGoal>>([]);

  const showSearchFiltersModal = useRecoilValue(showSearchFilters);
  const setShowSearchFiltersModal = useSetRecoilState(showSearchFilters);
  const handleOnClickShowSearchFilters = () => {
    setShowSearchFiltersModal(!showSearchFiltersModal);
  };

  const handleSearchFilterType = (type: SearchFilterType) => {
    setSearchFilterType((prev) => {
      if (prev === type) return SearchFilterType.none;
      return type;
    });
  };

  const {
    isLoading: isLoadingGoals,
    data: searchGoals,
    isError,
  } = useQuery<Array<ISearchGoal>>('searchGoals', () => goalApi.getGoalsByWord(location.search));

  useEffect(() => {
    if (!searchGoals) return;
    setSearchResults([...searchGoals]);
    setSearchStatus(true);
  }, [searchGoals]);

  return (
    <Wrapper>
      <TopContentWrapper>
        <div>전체 {searchResults ? searchResults?.length : 0}개</div>
        <FiltersBox>
          {searchFilters.map((filter) => (
            <FilterButton
              key={filter}
              selected={searchFilterType === filter}
              onClick={() => {
                handleSearchFilterType(filter);
                handleOnClickShowSearchFilters();
              }}>
              {searchFilterKR(filter)}
            </FilterButton>
          ))}
        </FiltersBox>
      </TopContentWrapper>
      {searchStatus ? (
        <>
          <GoalCardsWrapper>
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
              searchResults?.map((goal) => <GroupGoalCards key={goal.goalId} goal={goal} />)
              // .filter((result) => filterdResultsStatus?.includes(result))
              // .filter((result) => filterdResultsAmount?.includes(result))
              // .filter((result) => filterdResultsPeriod?.includes(result))
              // .filter((result) => filterdResultsHeadCount?.includes(result))
            )}
          </GoalCardsWrapper>
        </>
      ) : (
        <></>
      )}
      <ModalBox show={showSearchFiltersModal}>
        <SearchFilterSetter />
      </ModalBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopContentWrapper = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 4px solid ${(props) => props.theme.primaryMain};
`;

const FiltersBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  padding: 0px 22px;
`;

const FilterButton = styled.div<{ selected: boolean }>`
  padding: 4px 10px;
  font: ${(props) => props.theme.captionC1};
  color: white;
  border: ${(props) => (props.selected ? `2px solid ${props.theme.primary900}` : '')};
  border-radius: 8px;
  background-color: ${(props) => props.theme.primaryMain};
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

const AlertWrapper = styled.div`
  padding: 0 22px;
  width: calc(100% - 44px);
`;

export default SearchGoals;
