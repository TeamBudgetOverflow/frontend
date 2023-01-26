import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import GoalInfoInput from '../components/goal/post/GoalInfoInput';

import { postGoal } from '../recoil/goalsAtoms';

const CreateGoalData = () => {
  const { type } = useParams();
  const savedPostGoal = useRecoilValue(postGoal);

  return (
    <Wrapper>
      <GoalInfoInput isGroup={type === 'group'} initVal={savedPostGoal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 28px 22px 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 44px);
  height: calc(100% - 48px);
  overflow-y: auto;
  background-color: white;
`;

export default CreateGoalData;
