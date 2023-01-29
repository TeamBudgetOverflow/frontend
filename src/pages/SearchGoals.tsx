import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GroupGoalCards from '../components/goal/GroupGoalCard';
import ModalBox from '../components/common/elem/ModalBox';
import SearchFilterSetter from '../components/goal/searchFilter/SearchFilterSetter';
import Info from '../components/common/alert/Info';

import { showSearchFilters } from '../recoil/goalsAtoms';

import useSearchFilteredData from '../hooks/useSearchFilteredData';
import useSearchFilterCoditionState from '../hooks/useSearchFilterState';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';

enum SearchFilterType {
  status,
  amount,
  period,
  member,
  none,
}

const searchFilters = [
  SearchFilterType.status,
  SearchFilterType.amount,
  SearchFilterType.period,
  SearchFilterType.member,
];

const searchFilterKR = (filterType: SearchFilterType) => {
  switch (filterType) {
    case SearchFilterType.status:
      return '진행상태';
    case SearchFilterType.amount:
      return '목표금액';
    case SearchFilterType.period:
      return '진행기간';
    case SearchFilterType.member:
      return '모집인원';
    default:
      return '';
  }
};

const SearchGoals = () => {
  const [searchFilterType, setSearchFilterType] = useState<SearchFilterType>(SearchFilterType.none);

  const { search } = useLocation();
  const keyword = search.split('=')[1];

  const {
    filterSorted,
    filterOrdered,
    filterRangeMin,
    filterRangeMax,
    filterStatus,
    pageNumber,
    handlePageNumberChange,
  } = useSearchFilterCoditionState();

  const { isLoading, isError, data } = useSearchFilteredData({
    queries: {
      keyword: keyword,
      sorted: filterSorted,
      orderd: filterOrdered,
      min: filterRangeMin,
      max: filterRangeMax,
      status: filterStatus,
      page: pageNumber,
    },
  });

  const showSearchFiltersModal = useRecoilValue(showSearchFilters);
  const setShowSearchFiltersModal = useSetRecoilState(showSearchFilters);
  const handleOnClickShowSearchFilters = () => {
    setShowSearchFiltersModal(!showSearchFiltersModal);
  };

  if (isLoading)
    return (
      <Wrapper>
        <Info type='loading'>목표를 검색 중 입니다.</Info>
      </Wrapper>
    );

  if (isError)
    return (
      <Wrapper>
        <Info type='error'>
          목표 검색에 실패했습니다.
          <br />
          다시 시도해주세요.
        </Info>
      </Wrapper>
    );

  return (
    <Wrapper>
      <TopContentWrapper>
        <div>전체 {data ? data.result.length : 0}개</div>
        <FiltersBox>
          {searchFilters.map((filter) => (
            <FilterButton
              key={filter}
              selected={searchFilterType === filter}
              onClick={() => {
                handleOnClickShowSearchFilters();
              }}>
              {searchFilterKR(filter)}
            </FilterButton>
          ))}
        </FiltersBox>
      </TopContentWrapper>

      <GoalCardsWrapper>
        {isLoading || !data ? (
          <Alert showBgColor={true}>
            <LoadingMsg />
          </Alert>
        ) : isError ? (
          <Alert showBgColor={true}>
            <ErrorMsg />
          </Alert>
        ) : (
          data.result.map((goal) => <GroupGoalCards key={goal.goalId} goal={goal} />)
        )}
      </GoalCardsWrapper>

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

export default SearchGoals;
