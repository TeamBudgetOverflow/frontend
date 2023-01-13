import React from 'react';
import styled from 'styled-components';

const GoalPeriodCard = () => {
  return (
    <GoalPeriodCardWrapper>
      <div>GoalPeriod</div>
    </GoalPeriodCardWrapper>
  );
};

const GoalPeriodCardWrapper = styled.div`
  width: 90%;
  height: 46px;
  border-radius: 16px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export default GoalPeriodCard;
