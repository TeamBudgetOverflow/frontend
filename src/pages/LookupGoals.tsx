import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import GroupGoalCardSmall from '../components/goal/GroupGoalCardSmall';
import GroupGoalCard from '../components/goal/GroupGoalCard';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useGoalLookupData from '../hooks/useGoalLookupData';

const LookupGoals = () => {
  const [page, setPage] = useState(1);
  const preventRef = useRef(true); //중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  const { isLoading, isError, refetch, goals, impendingGoals } = useGoalLookupData(page);

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) {
      observer.observe(obsRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(page);
    refetch();
  }, [page]);

  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    if (entries[0].isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  // const { isEnd, pageNum } = useInfiniteScroll({ handleOnScrollEndEvent: refetch });

  // useEffect(() => {
  //   setPage(pageNum);
  //   refetch();
  // }, [pageNum]);

  const goalCards = goals
    .filter((goal) => goal.headCount !== 1)
    .map((goal) => <GroupGoalCard key={goal.goalId} goal={goal} />);
  const impendingGoalCard = impendingGoals
    .filter((goal) => goal.headCount !== 1)
    .slice(0, 10)
    .map((goal) => <GroupGoalCardSmall key={goal.goalId} goal={goal} />);

  return (
    <Wrapper>
      <TopContent>
        <TitleBox>
          <SubTitle>마감임박 목표</SubTitle>
          <Button>모두보기</Button>
        </TitleBox>
        {isLoading ? (
          <AlertWrapper>
            <Alert showBgColor={true}>
              <LoadingMsg />
            </Alert>
          </AlertWrapper>
        ) : isError ? (
          <AlertWrapper>
            <Alert showBgColor={true}>
              <ErrorMsg />
            </Alert>
          </AlertWrapper>
        ) : (
          <ImpendingGoalCards>{impendingGoalCard}</ImpendingGoalCards>
        )}
      </TopContent>
      <BottomContent>
        <TitleBox>
          <SubTitle>목표</SubTitle>
        </TitleBox>
        {isLoading ? (
          <AlertWrapper>
            <Alert showBgColor={true}>
              <LoadingMsg />
            </Alert>
          </AlertWrapper>
        ) : isError ? (
          <AlertWrapper>
            <Alert showBgColor={true}>
              <ErrorMsg />
            </Alert>
          </AlertWrapper>
        ) : (
          <GoalCardsWrapper>
            {goalCards}
            <div ref={obsRef} style={{ height: '10vh' }}>
              로딩중입니다.
            </div>
          </GoalCardsWrapper>
        )}
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

const TopContent = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: calc(35% - 22px);
  border-bottom: 2px solid ${(props) => props.theme.gray200};
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

const Button = styled.div`
  font: ${(props) => props.theme.captionC2};
  color: ${(props) => props.theme.primary900};
`;

const ImpendingGoalCards = styled.div`
  padding: 5px 22px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: nowrap;
  width: calc(100% - 44px);
  overflow-x: auto;
`;

const BottomContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: calc(65% - 20px);
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

const AlertWrapper = styled.div`
  padding: 0 22px;
  width: calc(100% - 44px);
`;

export default LookupGoals;
