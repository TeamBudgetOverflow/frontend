import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Info from '../../common/alert/Info';
import GroupGoalCard from '../GroupGoalCard';
import Alert from '../../common/alert/Alert';
import LoadingMsg from '../../common/elem/LoadingMsg';
import ErrorMsg from '../../common/elem/ErrorMsg';

import useSearchGoalsData from '../../../hooks/useSearchGoalsData';

import { ISearchFilter } from '../../../interfaces/interfaces';

import { detailGoalId, groupGoals, isSearchGoalLastPage, searchGoalLastUpdate } from '../../../recoil/goalsAtoms';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  params: ISearchFilter;
  totalCntHandler: (totalCnt: number) => void;
}

const SearchResults = ({ params, totalCntHandler }: SearchResultsProps) => {
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
  const [cursor, setCursor] = useState(0);
  const [goalId, setGoalId] = useState(0);
  useEffect(() => {
    if (!savedIsLastPage) searchGoals({ ...params, cursor, goalId });
  }, [goalId]);

  useEffect(() => {
    setCursor(0);
    setGoalId(0);
    resetIsLastPage();
    searchGoals({ ...params, cursor: 0, goalId: 0 });
  }, [params.keyword, params.status, params.ordered, params.sorted, params.min, params.max]);

  useEffect(() => {
    totalCntHandler(totalCnt);
  }, [totalCnt]);

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = () => {
    if (!scrollBoxRef.current) return;
    if (
      Math.trunc(scrollBoxRef.current.scrollHeight - scrollBoxRef.current.scrollTop) ===
      scrollBoxRef.current.clientHeight
    ) {
      localStorage.setItem('scrollTop', String(scrollBoxRef.current.scrollTop));
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

  useEffect(() => {
    if (!scrollBoxRef.current) return;
    if (goalId === 0) return localStorage.setItem('scrollTop', '0');
    const scrollTop = localStorage.getItem('scrollTop');
    scrollBoxRef.current.scrollTop = Number(scrollTop);
  }, [searchGoals]);

  const savedGoalId = useRecoilValue(detailGoalId);
  const goalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!goalRef.current) return;
    goalRef.current.scrollIntoView();
  }, [goalRef.current]);

  const [routeGoalId, setRoutGoalId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (routeGoalId !== 0) return navigate(`/goals/${routeGoalId}`);
    saveGoalId(0);
  }, [routeGoalId]);

  const saveGoalId = useSetRecoilState(detailGoalId);
  useEffect(() => {
    if (
      (savedSearchGoals.length === 1 && savedSearchGoals[0].goalId === 0) ||
      new Date().getTime() - savedLastUpdate.getTime() > 30000
    ) {
      setCursor(0);
      setGoalId(0);
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
      {searchResult.length === 0 ? (
        <EmptyData>
          <InfoText>{`검색 결과가 없습니다.\n검색 결과에 알맞는 첫번째 목표를 추가해보세요!`}</InfoText>
        </EmptyData>
      ) : (
        searchResult.map((goal) => {
          if (goal.goalId === savedGoalId)
            return (
              <div ref={goalRef} key={goal.goalId}>
                <GroupGoalCard goal={goal} goalClickHandler={() => setRoutGoalId(goal.goalId)} />
              </div>
            );
          return (
            <div key={goal.goalId}>
              <GroupGoalCard goal={goal} goalClickHandler={() => setRoutGoalId(goal.goalId)} />
            </div>
          );
        })
      )}
      {searchResult.length !== 0 && isLoading ? (
        <Alert showBgColor={false}>
          <LoadingMsg />
        </Alert>
      ) : (
        <></>
      )}
      {searchResult.length !== 0 && isError ? (
        <Alert showBgColor={false}>
          <ErrorMsg />
        </Alert>
      ) : (
        <></>
      )}
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

export default SearchResults;
