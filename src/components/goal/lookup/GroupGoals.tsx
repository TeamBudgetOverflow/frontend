import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Alert from '../../common/alert/Alert';
import LoadingMsg from '../../common/elem/LoadingMsg';
import ErrorMsg from '../../common/elem/ErrorMsg';
import GroupGoalCard from '../GroupGoalCard';
import useGoalLookupData from '../../../hooks/useGoalLookupData';

const GroupGoals = () => {
  const [pages, setPages] = useState<number>(1);

  const { isLoading, isError, goals, isLastPage, refetch } = useGoalLookupData(pages);

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = () => {
    if (!scrollBoxRef.current) return;
    if (
      Math.trunc(scrollBoxRef.current.scrollHeight - scrollBoxRef.current.scrollTop) ===
      scrollBoxRef.current.clientHeight
    ) {
      setPages((prev) => prev + 1);
      localStorage.setItem('scrollTop', String(scrollBoxRef.current.scrollTop));
    }
  };

  useEffect(() => {
    refetch();
  }, [pages]);

  useEffect(() => {
    if (!scrollBoxRef.current) return;
    if (pages === 1) return localStorage.setItem('scrollTop', '0');
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
          goals.map((goal) => <GroupGoalCard key={goal.goalId} goal={goal} />)
        )}
      </GoalCardsWrapper>
    </BottomContent>
  );
};

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
  overflow: hidden;
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

export default GroupGoals;
