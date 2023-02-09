import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Alert from '../../common/alert/Alert';
import LoadingMsg from '../../common/elem/LoadingMsg';
import ErrorMsg from '../../common/elem/ErrorMsg';
import GroupGoalCard from '../GroupGoalCard';

import useGoalLookupData from '../../../hooks/useGoalLookupData';

import { detailGoalId, groupGoals, isSearchGoalLastPage, searchGoalLastUpdate } from '../../../recoil/goalsAtoms';
import { useNavigate } from 'react-router-dom';

const GroupGoals = () => {
  const [cursor, setCursor] = useState<number>(0);
  const savedLookupGoals = useRecoilValue(groupGoals);
  const savedIsLastPage = useRecoilValue(isSearchGoalLastPage);
  const savedLastUpdate = useRecoilValue(searchGoalLastUpdate);
  const savedGoalId = useRecoilValue(detailGoalId);
  const { isLoading, isError, goals, mutate } = useGoalLookupData({ initVal: savedLookupGoals });

  useEffect(() => {
    if (!savedIsLastPage) mutate(cursor);
  }, [cursor]);

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (Math.trunc(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === e.currentTarget.clientHeight) {
      setCursor(goals[goals.length - 1].goalId);
      localStorage.setItem('scrollTop', String(e.currentTarget.scrollTop));
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) return;
    const scrollTop = localStorage.getItem('scrollTop');
    scrollBoxRef.current.scrollTop = Number(scrollTop);
  }, [goals]);

  const detailGoalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!detailGoalRef.current) return;
    detailGoalRef.current.scrollIntoView();
  }, [detailGoalRef.current]);

  const [routeGoalId, setRouteGoalId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (routeGoalId !== 0) return navigate(`/goals/${routeGoalId}`);
    saveGoalId(0);
  }, [routeGoalId]);

  const saveGoalId = useSetRecoilState(detailGoalId);
  useEffect(() => {
    if (
      (savedLookupGoals.length === 1 && savedLookupGoals[0].goalId === 0) ||
      new Date().getTime() - savedLastUpdate.getTime() > 30000
    ) {
      return setCursor(0);
    }

    setCursor(savedLookupGoals[savedLookupGoals.length - 1].goalId);
  }, []);

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
        onScroll={(e) => {
          if (!savedIsLastPage) isScrollBottom(e);
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
            {goals.length === 0 ? (
              <EmptyData>
                <InfoText>{`아직 마감 임박인 목표가 없습니다.\n첫번째 목표를 추가해보세요!`}</InfoText>
              </EmptyData>
            ) : (
              goals.map((goal) => {
                if (goal.goalId === savedGoalId) {
                  return (
                    <div key={goal.goalId} ref={detailGoalRef}>
                      <GroupGoalCard goal={goal} goalClickHandler={() => setRouteGoalId(goal.goalId)} />
                    </div>
                  );
                }
                return (
                  <GroupGoalCard key={goal.goalId} goal={goal} goalClickHandler={() => setRouteGoalId(goal.goalId)} />
                );
              })
            )}
          </>
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

export default GroupGoals;
