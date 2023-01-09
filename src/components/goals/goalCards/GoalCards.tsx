import React from 'react';

import styled from 'styled-components';

const GoalCards = () => {
  return (
    <CardWrapper>
      <span>진행중</span>
      <span>D-150</span>
      <span>목표이름</span>
      <span>100,000원</span>
      <span>100,000원</span>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 370px;
  height: 120px;
  border: 1px solid;
  border-radius: 16px;
`;

export default GoalCards;
