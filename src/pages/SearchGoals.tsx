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

import useSearchFilteredData from '../hooks/useSearchFilteredData';
import useSearchFilterState from '../hooks/useSearchFilterState';

import {
  StatusTypetoString,
  OrderTypetoString,
  SortTypetoString,
  StatusTypeKR,
  StatusType,
  SortType,
} from '../interfaces/interfaces';
import useSearchFilterTags from '../hooks/useSearchFilterTags';

const SearchGoals = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string | null>('');
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    setKeyword(keyword);
  }, [searchParams]);

  const {
    filter,
    orderType,
    page,
    handleFilterChange,
    handleStatusChange,
    handleSortChange,
    handleRangeChange,
    handleOrderTypeChange,
    handlePageChange,
  } = useSearchFilterState();
  const handleFilterInputChange = (status: StatusType, sortType: SortType, min: number, max: number) => {
    handleFilterChange(status, sortType, min, max);
  };
  const { filterTags, handleFilterAdd, handleFilterRemove, handleFiltersReset } = useSearchFilterTags({
    statusChangeHandler: handleStatusChange,
    sortChangeHandler: handleSortChange,
    rangeChangeHandler: handleRangeChange,
  });
  useEffect(() => {
    handleFiltersReset();
    switch (filter.sorted) {
      case SortType.amount:
        handleFilterAdd(SearchFilterType.amount, `${filter.min.toLocaleString()}원 ~ ${filter.max.toLocaleString()}원`);
        break;
      case SortType.period:
        handleFilterAdd(SearchFilterType.period, `${filter.min}일 ~ ${filter.max}일`);
        break;
      case SortType.member:
        handleFilterAdd(SearchFilterType.member, `${filter.min}명 ~ ${filter.max}명`);
        break;
      case SortType.none:
        handleFiltersReset();
    }

    handleFilterAdd(SearchFilterType.status, StatusTypeKR(filter.status));
  }, [filter]);

  const { isLoading, isError, searchGoals, isLastPage, totalCnt } = useSearchFilteredData({
    keyword: keyword,
    status: StatusTypetoString(filter.status),
    ordered: OrderTypetoString(orderType),
    sorted: SortTypetoString(filter.sorted),
    min: filter.min,
    max: filter.max,
    page,
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleFilterModal = (show: boolean) => {
    setShowModal(show);
  };

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = () => {
    if (!scrollBoxRef.current) return;
    if (scrollBoxRef.current.scrollHeight - scrollBoxRef.current.scrollTop === scrollBoxRef.current.clientHeight) {
      handlePageChange(page + 1);
      localStorage.setItem('scrollTop', String(scrollBoxRef.current.scrollTop));
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) return;
    if (page === 1) return localStorage.setItem('scrollTop', '0');
    const scrollTop = localStorage.getItem('scrollTop');
    scrollBoxRef.current.scrollTop = Number(scrollTop);
  }, [searchGoals]);

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
        <Total>전체 {totalCnt}개</Total>
        <FiltersBox>
          {filterTags.map((filter) =>
            filter.value.length === 0 ? (
              <TagWrapper key={filter.type} onClick={() => handleFilterModal(true)}>
                <FilterTag value={searchFilterKR(filter.type)} />
              </TagWrapper>
            ) : (
              <FilterTag key={filter.type} value={filter.value} removeHandler={() => handleFilterRemove(filter.type)} />
            )
          )}
        </FiltersBox>
      </TopContentWrapper>
      <GoalCardsWrapper
        ref={scrollBoxRef}
        onScroll={() => {
          if (!isLastPage) isScrollBottom();
        }}>
        {isLoading ? (
          <Alert showBgColor={true}>
            <LoadingMsg />
          </Alert>
        ) : isError ? (
          <Alert showBgColor={true}>
            <ErrorMsg />
          </Alert>
        ) : (
          searchGoals.map((goal) => <GroupGoalCards key={goal.goalId} goal={goal} />)
        )}
      </GoalCardsWrapper>
      <ModalBox show={showModal}>
        <FiltersModal changeHandler={handleFilterInputChange} closeHandler={() => handleFilterModal(false)} />
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
  padding: 20px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 4px solid ${(props) => props.theme.gray100};
`;

const Total = styled.div`
  padding: 5px 22px;
  font: ${(props) => props.theme.captionC1};
`;

const FiltersBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  padding: 0px 22px;
  overflow-x: auto;
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
`;

export default SearchGoals;
