import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import NarrowGroupGoalCard from '../components/goal/NarrowGroupGoalCard';
import GroupGoalCard from '../components/goal/StateGoalCard';

import { userGoals, userInfo } from '../recoil/userAtoms';

import { IGoals } from '../interfaces/interfaces';

import { goalApi } from '../apis/client';
import { searchBarOnFocusEvent } from '../recoil/searchAtoms';

const GroupGoals = () => {
  const { id } = useRecoilValue(userInfo);

  const { isLoading: isLoadingGoals, data: goalsData } = useQuery<IGoals>('getGoals', () => goalApi.getGoals());
  const setUserGoals = useSetRecoilState(userGoals);
  const goals = useRecoilValue(userGoals);

  useEffect(() => {
    if (!goalsData) return;
    setUserGoals(goalsData.goals);
  }, [goalsData]);

  const goalCards = goals.map((goal) => <GroupGoalCard key={goal.id} goal={goal} />);
  const impendingGoalCard = goals.map((goal) => <NarrowGroupGoalCard key={goal.id} goal={goal} />);

  const searchBarOnFocusAtom = useRecoilValue(searchBarOnFocusEvent);

  return (
    <Wrapper>
      <TopContent>
        <TitleBox>
          <SubTitle>마감임박 목표</SubTitle>
          <Button>모두보기</Button>
        </TitleBox>
        <ImpendingGoalCards>
          {isLoadingGoals ? <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg> : impendingGoalCard}
        </ImpendingGoalCards>
      </TopContent>
      <Line />
      <BottomContent>
        <TitleBox>
          <SubTitle>전체 목표</SubTitle>
          <Button>추천순</Button>
        </TitleBox>
        <GoalCardsWrapper>
          {isLoadingGoals ? <LoadingMsg>데이터를 불러오는 중입니다</LoadingMsg> : goalCards}
        </GoalCardsWrapper>
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 100%;
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
  font: ${(props) => props.theme.captionC3};
`;

const ImpendingGoalCards = styled.div`
  padding: 5px 22px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.gray200};
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 95%;
  height: 50%;
`;

const GoalCardsWrapper = styled.div`
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 44px);
  height: 430px;
  overflow-y: auto;
`;

const LoadingMsg = styled.div`
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.gray100};
`;

export default GroupGoals;
