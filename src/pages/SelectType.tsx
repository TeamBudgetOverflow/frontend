import React, { useState } from 'react';
import styled from 'styled-components';

import TypeSelect from '../components/goal/post/TypeSelect';

export enum GoalType {
  group,
  personal,
  none,
}

function SelectType() {
  return (
    <Wrapper>
      <TypeSelect />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 28px 22px 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 44px);
  height: calc(100% - 48px);
  overflow-y: auto;
  background-color: white;
`;

export default SelectType;
