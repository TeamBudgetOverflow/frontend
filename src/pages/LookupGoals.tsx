import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';
import ImpendingGoals from '../components/goal/lookup/ImpendingGoals';
import GroupGoalCards from '../components/goal/GroupGoalCard';

import useGoalLookupData from '../hooks/useGoalLookupData';

const LookupGoals = () => {
  const [page, setPage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const { isLoading, isError, goals, isLastPage, refetch } = useGoalLookupData(page);

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = () => {
    if (!scrollBoxRef.current) return;
    if (
      Math.trunc(scrollBoxRef.current.scrollHeight - scrollBoxRef.current.scrollTop) ===
      scrollBoxRef.current.clientHeight
    ) {
      handlePageChange(page + 1);
      localStorage.setItem('scrollTop', String(scrollBoxRef.current.scrollTop));
      refetch();
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) return;
    if (page === 1) return localStorage.setItem('scrollTop', '0');
    const scrollTop = localStorage.getItem('scrollTop');
    scrollBoxRef.current.scrollTop = Number(scrollTop);
  }, [goals]);

  const [topContentHeight, setTopContentHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    setTopContentHeight(ref.current.clientHeight);
  }, [ref.current]);

  return (
    <Wrapper>
      <div ref={ref}>
        <ImpendingGoals />
      </div>

      <BottomContent topContentHeight={topContentHeight}>
        <TitleBox>
          <SubTitle>목표</SubTitle>
        </TitleBox>
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
            goals.map((goal) => <GroupGoalCards key={goal.goalId} goal={goal} />)
          )}
        </GoalCardsWrapper>
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 20px);
  overflow: hidden;
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

const BottomContent = styled.div<{ topContentHeight: number }>`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: calc(100% - ${(props) => props.topContentHeight + 20}px);
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

export default LookupGoals;
