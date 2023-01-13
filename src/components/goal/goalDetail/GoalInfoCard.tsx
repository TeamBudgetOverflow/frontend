import React from 'react';
import styled from 'styled-components';

const GoalInfoCard = () => {
  return (
    <GoalInfoCardWrapper>
      <div>GroupGoalInfo</div>
    </GoalInfoCardWrapper>
  );
};

const GoalInfoCardWrapper = styled.div`
  width: 90%;
  height: 188px;
  border-radius: 16px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default GoalInfoCard;
