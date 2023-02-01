import React from 'react';
import styled from 'styled-components';

import TypeSelect from '../components/goal/post/TypeSelectSection';

export enum GoalType {
  group,
  personal,
  none,
}

const SelectGoalType = () => {
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
