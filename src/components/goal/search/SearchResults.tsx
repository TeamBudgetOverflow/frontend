import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Info from '../../common/alert/Info';

import useSearchGoalsData from '../../../hooks/useSearchGoalsData';
import useSaveScroll from '../../../hooks/useSaveScroll';

import {
  groupGoals,
  isSearchGoalLastPage,
  searchGoalLastUpdate,
  scrollPosition,
  cursor,
  goalId,
  searchFilters,
} from '../../../recoil/goalsAtoms';
import ScrollPaginationGoals from '../ScrollPaginationGoals';

interface SearchResultsProps {
  totalCntHandler: (totalCnt: number) => void;
}

const SearchResults = ({ totalCntHandler }: SearchResultsProps) => {
  const params = useRecoilValue(searchFilters);
  const savedSearchGoals = useRecoilValue(groupGoals);
  const savedIsLastPage = useRecoilValue(isSearchGoalLastPage);
  const savedLastUpdate = useRecoilValue(searchGoalLastUpdate);
  const {
    isLoading,
    isError,
    searchResult,
    totalCnt,
    mutate: searchGoals,
    resetIsLastPage,
  } = useSearchGoalsData({ initVal: savedSearchGoals });

  // cursor is last goal's sorted type value (ex. amount, period, member(=headCount))
  // cursor is 0 on goal's sorted type is none
  // goalId is search result's last goal's goalId
  const savedCursor = useRecoilValue(cursor);
  const savedGoalId = useRecoilValue(goalId);
  useEffect(() => {
    if (!savedIsLastPage) searchGoals({ ...params, cursor: savedCursor, goalId: savedGoalId });
  }, [savedCursor, savedGoalId]);

  const setCursor = useSetRecoilState(cursor);
  const setGoalId = useSetRecoilState(goalId);
  useEffect(() => {
    setCursor(0);
    setGoalId(0);
    resetIsLastPage();
    searchGoals({ ...params, cursor: 0, goalId: 0 });
  }, [params.keyword, params.status, params.ordered, params.sorted, params.min, params.max]);

  useEffect(() => {
    totalCntHandler(totalCnt);
  }, [totalCnt]);

  const { scrollBoxRef, handleGoalClick, handleSaveScroll } = useSaveScroll();
  const isScrollBottom = () => {
    if (!scrollBoxRef.current) return;
    if (
      Math.trunc(scrollBoxRef.current.scrollHeight - scrollBoxRef.current.scrollTop) ===
      scrollBoxRef.current.clientHeight
    ) {
      handleSaveScroll(scrollBoxRef.current.clientHeight);
      setGoalId(searchResult[searchResult.length - 1].goalId);
      switch (params.sorted) {
        case 'amount':
          return setCursor(searchResult[searchResult.length - 1].amount);
        case 'period':
          return setCursor(searchResult[searchResult.length - 1].period);
        case 'member':
          return setCursor(searchResult[searchResult.length - 1].headCount);
        default:
          return setCursor(0);
      }
    }
  };

  const savedScrollPosition = useRecoilValue(scrollPosition);
  useEffect(() => {
    if (!isLoading && searchResult.length !== 0) {
      if (!scrollBoxRef.current) return;
      if (savedGoalId === 0) return handleSaveScroll(0);
      scrollBoxRef.current.scrollTop = savedScrollPosition;
    }
  }, [searchResult, scrollBoxRef.current?.scrollHeight]);

  useEffect(() => {
    if (savedSearchGoals.length === 0 || new Date().getTime() - savedLastUpdate.getTime() > 30000) {
      setCursor(0);
      setGoalId(0);
      handleSaveScroll(0);
    } else {
      setGoalId(savedSearchGoals[savedSearchGoals.length - 1].goalId);
      switch (params.sorted) {
        case 'amount':
          return setCursor(savedSearchGoals[savedSearchGoals.length - 1].amount);
        case 'period':
          return setCursor(savedSearchGoals[savedSearchGoals.length - 1].period);
        case 'member':
          return setCursor(savedSearchGoals[savedSearchGoals.length - 1].headCount);
        default:
          return setCursor(0);
      }
    }
  }, []);

  if (searchResult.length === 0 && isLoading)
    return (
      <Wrapper>
        <Info type='loading'>목표를 검색 중 입니다.</Info>
      </Wrapper>
    );

  if (searchResult.length === 0 && isError)
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
    <GoalCardsWrapper
      ref={scrollBoxRef}
      onScroll={() => {
        if (!savedIsLastPage) isScrollBottom();
      }}>
      <ScrollPaginationGoals
        isLoading={isLoading}
        isError={isError}
        emptyMsg={`검색 결과가 없습니다.\n검색 결과에 알맞는 첫번째 목표를 추가해보세요!`}
        goals={searchResult}
        goalClickHandler={handleGoalClick}
      />
    </GoalCardsWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

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

export default SearchResults;
