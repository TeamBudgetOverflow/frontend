import React from 'react';
import styled from 'styled-components';

import { GoalStatus } from '../../../interfaces/interfaces';

const stateKR = (state: GoalStatus) => {
  switch (state) {
    case GoalStatus.recruit:
      return '진행 예정';
    case GoalStatus.proceeding:
      return '진행중';
    case GoalStatus.done:
      return '종료';
    default:
      return '';
  }
};

const stateColor = (state: GoalStatus) => {
  switch (state) {
    case GoalStatus.recruit:
      return '#f9c342';
    case GoalStatus.proceeding:
      return '#009642';
    case GoalStatus.done:
      return 'black';
    default:
      return '';
  }
};

const StateTag = ({ state }: { state: GoalStatus }) => {
  return (
    <Tag>
      <StateCircle color={stateColor(state)} />
      <Text color={stateColor(state)}>{stateKR(state)}</Text>
    </Tag>
  );
};

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StateCircle = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Text = styled.div<{ color: string }>`
  font: ${(props) => props.theme.captionC2};
  color: ${(props) => props.color};
`;

export default StateTag;
