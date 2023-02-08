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
import Icon from '../components/common/elem/Icon';

import { SearchFilterType, searchFilterKR } from '../components/goal/searchFilter/FiltersModal';

import useSearchFilteredData from '../hooks/useSearchFilteredData';
import useSearchFilterState from '../hooks/useSearchFilterState';
import useSearchFilterTags from '../hooks/useSearchFilterTags';

import {
  StatusTypetoString,
  OrderTypeKR,
  OrderTypetoString,
  SortTypetoString,
  StatusTypeKR,
  StatusType,
  SortType,
  SortTypeKR,
  OrderType,
} from '../interfaces/interfaces';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const SearchGoals = () => {
  RouteChangeTracker();
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
    if (
      Math.trunc(scrollBoxRef.current.scrollHeight - scrollBoxRef.current.scrollTop) ===
      scrollBoxRef.current.clientHeight
    ) {
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
        <TopContent>
          <Total>전체 {totalCnt}개</Total>
          <OrderBtn onClick={() => handleOrderTypeChange(orderType === OrderType.asc ? OrderType.desc : OrderType.asc)}>
            {`${SortTypeKR(filter.sorted)} ${OrderTypeKR(filter.sorted, orderType)}`}
            <IconWrapper>
              <Icon
                width={14}
                height={18}
                color='black'
                path='M11 14.01V8.00002C11 7.45002 10.55 7.00002 10 7.00002C9.45003 7.00002 9.00003 7.45002 9.00003 8.00002V14.01H7.21003C6.76003 14.01 6.54003 14.55 6.86003 14.86L9.65003 17.64C9.85003 17.83 10.16 17.83 10.36 17.64L13.15 14.86C13.47 14.55 13.24 14.01 12.8 14.01H11ZM3.65003 0.35002L0.860031 3.14002C0.540031 3.45002 0.76003 3.99002 1.21003 3.99002H3.00003V10C3.00003 10.55 3.45003 11 4.00003 11C4.55003 11 5.00003 10.55 5.00003 10V3.99002H6.79003C7.24003 3.99002 7.46003 3.45002 7.14003 3.14002L4.35003 0.35002C4.16003 0.16002 3.84003 0.16002 3.65003 0.35002Z'
              />
            </IconWrapper>
          </OrderBtn>
        </TopContent>
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
          <>
            {searchGoals.length === 0 ? (
              <EmptyData>
                <InfoText>{`검색 결과가 없습니다.\n검색 결과에 알맞는 첫번째 목표를 추가해보세요!`}</InfoText>
              </EmptyData>
            ) : (
              searchGoals.map((goal) => <GroupGoalCards key={goal.goalId} goal={goal} />)
            )}
          </>
        )}
      </GoalCardsWrapper>
      <ModalBox show={showModal} maxScreenHeight={700}>
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

const TopContent = styled.div`
  padding: 5px 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 44px);
`;

const Total = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const OrderBtn = styled.div`
  padding: 4px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font: ${(props) => props.theme.captionC1};
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.gray300};
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
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

const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.gray300};
`;

const InfoText = styled.div`
  text-align: center;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.primary400};
  line-height: 150%;
  white-space: pre-wrap;
`;

export default SearchGoals;
