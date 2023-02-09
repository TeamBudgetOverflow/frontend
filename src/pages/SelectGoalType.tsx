import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import TypeSelect from '../components/goal/post/TypeSelectSection';

import { detailGoalId } from '../recoil/goalsAtoms';

export enum GoalType {
  group,
  personal,
  none,
}

const SelectGoalType = () => {
  const setGoalId = useSetRecoilState(detailGoalId);
  useEffect(() => {
    setGoalId(0);
  }, []);

  return (
    <Wrapper>
      <TypeSelect />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 28px 22px 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 44px);
  height: calc(100% - 48px);
  overflow-y: auto;
  background-color: white;
`;

export default SelectGoalType;
