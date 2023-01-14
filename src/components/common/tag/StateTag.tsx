import React from 'react';
import styled from 'styled-components';

const StateTag = ({ state }: { state: 'working' | 'recruiting' }) => {
  return <Tag>{state === 'working' ? '진행중' : '모집중'}</Tag>;
};

const Tag = styled.div`
  font: ${(props) => props.theme.captionC3};
`;

export default StateTag;
