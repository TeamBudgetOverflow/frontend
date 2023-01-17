import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import TypeSelect from '../components/goal/post/TypeSelect';
import GoalInfoInput from '../components/goal/post/GoalInfoInput';

import { postGoalType } from '../recoil/goalsAtoms';

export enum GoalType {
  group,
  personal,
  none,
}

const PostGoal = () => {
  const [goalType, setGoalType] = useState<GoalType>(GoalType.none);
  const savedGoalType = useRecoilValue(postGoalType);
  useEffect(() => {
    if (!savedGoalType.isSelected) return setGoalType(GoalType.none);
    setGoalType(savedGoalType.isGroup ? GoalType.group : GoalType.personal);
  }, [savedGoalType]);

  const setPostGoalType = useSetRecoilState(postGoalType);
  const handleSelectGoalType = (type: GoalType) => {
    if (type === GoalType.group) {
      setGoalType(GoalType.group);
      setPostGoalType({
        isSelected: true,
        isGroup: true,
      });
      return;
    }

    if (type === GoalType.personal) {
      setGoalType(GoalType.personal);
      setPostGoalType({
        isSelected: true,
        isGroup: false,
      });
    }
  };

  return (
    <Wrapper>
      {goalType === GoalType.none ? (
        <TypeSelect typeSelectHandler={handleSelectGoalType}></TypeSelect>
      ) : (
        <GoalInfoInput isGroup={goalType === GoalType.group} />
      )}
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

export default PostGoal;
