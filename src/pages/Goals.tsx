import React from 'react';
import { useRecoilValue } from 'recoil';
import GoalCards from '../components/goals/goalCards/GoalCards';
import GoalAtom from '../recoil/GoalAtom';

import styled from 'styled-components';

const Goals = () => {
  const goals = useRecoilValue(GoalAtom);

  // const goalCards = goals.map()

  // console.log(goals);
  return (
    <GoalCardsWrapper>
      <GoalCards goals={goals} />
    </GoalCardsWrapper>
  );
};

const GoalCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Goals;
