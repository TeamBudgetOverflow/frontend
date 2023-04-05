import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ScrollPaginationGoals from '../ScrollPaginationGoals';

import useGoalLookupData from '../../../hooks/useGoalLookupData';
import useSaveScroll from '../../../hooks/useSaveScroll';

import { groupGoals, isSearchGoalLastPage, searchGoalLastUpdate, scrollPosition } from '../../../recoil/goalsAtoms';

const GroupGoals = () => {
  const [cursor, setCursor] = useState<number>(0);
  const savedLookupGoals = useRecoilValue(groupGoals);
  const savedIsLastPage = useRecoilValue(isSearchGoalLastPage);
  const savedLastUpdate = useRecoilValue(searchGoalLastUpdate);
  const { isLoading, isError, goals, mutate } = useGoalLookupData({ initVal: savedLookupGoals });
  useEffect(() => {
    if (!savedIsLastPage) mutate(cursor);
  }, [cursor]);

  const { scrollBoxRef, handleGoalClick, handleSaveScroll } = useSaveScroll();
  const isScrollBottom = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (Math.trunc(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === e.currentTarget.clientHeight) {
      setCursor(goals[goals.length - 1].goalId);
      handleSaveScroll(e.currentTarget.clientHeight);
    }
  };

  const savedScrollPosition = useRecoilValue(scrollPosition);
  useEffect(() => {
    if (savedLookupGoals.length === 0 || new Date().getTime() - savedLastUpdate.getTime() > 30000) {
      setCursor(0);
      if (!scrollBoxRef.current) return;
      scrollBoxRef.current.scrollTop = 0;
    } else {
      setCursor(savedLookupGoals[savedLookupGoals.length - 1].goalId);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && goals.length !== 0) {
      if (!scrollBoxRef.current) return;
      scrollBoxRef.current.scrollTop = savedScrollPosition;
    }
  }, [isLoading, goals, scrollBoxRef.current?.scrollHeight]);

  return (
    <Wrapper>
      <TitleBox>
        <SubTitle>목표</SubTitle>
      </TitleBox>
      <GoalCardsWrapper
        ref={scrollBoxRef}
        onScroll={(e) => {
          if (!savedIsLastPage) isScrollBottom(e);
        }}>
        <ScrollPaginationGoals
          isLoading={isLoading}
          isError={isError}
          emptyMsg={`현재 모집 중인 목표가 없습니다.\n그룹 목표를 추가해보세요!`}
          goals={goals}
          goalClickHandler={handleGoalClick}
        />
      </GoalCardsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
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
