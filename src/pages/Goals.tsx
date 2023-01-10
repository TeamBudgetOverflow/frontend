import React from 'react';
import { useRecoilValue } from 'recoil';
import GoalCards from '../components/goals/goalCards/GoalCards';

import styled from 'styled-components';
import { goalInfo } from '../recoil/GoalAtom';
import ImpendingGoalCards from '../components/goals/ImpendingCardsSection/ImpendingGoalCards';
import ImpendingGoalCardsList from '../components/goals/ImpendingCardsSection/ImpendingGoalCardsList';

const Goals = () => {
  const goals = useRecoilValue(goalInfo);

  const goalCards = goals.map((goal) => (
    <GoalCards key={goal.goalId} goal={goal} />
  ));

  return (
    <div>
      <ImpendingGoalCardsList goals={goals} />
      <GoalCardsWrapper>{goalCards}</GoalCardsWrapper>
    </div>
  );
};

const GoalCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Goals;
