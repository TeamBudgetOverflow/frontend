import React, { useState } from 'react';
import styled from 'styled-components';

import GroupGoalCardSmall from '../components/goal/GroupGoalCardSmall';
import GroupGoalCard from '../components/goal/GroupGoalCard';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';

import useGoalLookupData from '../hooks/useGoalLookupData';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const LookupGoals = () => {
  const setGoals = useSetRecoilState(groupGoals);
  const { isLoading: isLoadingGoals, isError } = useQuery<Array<ISearchGoal>>('getGoals', () => goalApi.getGoals(), {
    onSuccess: (data) => {
      setGoals(data);
    },
  });
  const goals = useRecoilValue(groupGoals);
  const [impendingGoals, setImpendingGoals] = useState<Array<ISearchGoal>>([...goals]);

    setIsLoad(false);
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

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

            <div ref={setTarget}>{isLoaded ? <ScrollMsg>데이터를 불러오고 있는 중입니다.</ScrollMsg> : <></>}</div>
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

const ScrollMsg = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  max-height: 160px;
  width: 100%;
  border-radius: 16px;
  background-color: white;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
`;

export default LookupGoals;
