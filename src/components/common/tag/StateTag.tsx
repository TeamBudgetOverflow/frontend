import React from 'react';
import styled from 'styled-components';

const StateTag = ({ state }: { state: 'working' | 'recruiting' }) => {
  return (
    <Tag>
      <StateCircle state={state} />
      <Text state={state}>{state === 'working' ? '진행 예정' : '모집중'}</Text>
    </Tag>
  );
};

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StateCircle = styled.div<{ state: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.state === 'working' ? props.theme.primary700 : props.theme.secondary700)};
`;

const Text = styled.div<{ state: string }>`
  font: ${(props) => props.theme.captionC2};
  color: ${(props) => (props.state === 'working' ? props.theme.primary700 : props.theme.secondary700)};
`;

export default StateTag;
