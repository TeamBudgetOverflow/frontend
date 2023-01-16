import React from 'react';
import styled from 'styled-components';

// TODO : 공통 버튼 컴포넌트 리팩터링
// TODO : 목표 삭제하기 delete
const GoalDeleteButton = () => {
  return <DelelteButton>삭제하기</DelelteButton>;
};

const DelelteButton = styled.button`
  max-width: 370px;
  width: 45%;
  height: 51px;
  border-radius: 8px;
  padding: 12px 16.5px;
`;

export default GoalDeleteButton;
