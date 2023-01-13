import React from 'react';
import styled from 'styled-components';
import { IGoalDetail } from '../../../../interfaces/interfaces';
import GoalDescCard from '../GoalDescCard';

import GoalInfo from '../GoalInfoCard';
import GoalPeriodCard from '../GoalPeriodCard';
import GroupGoalJoinButton from './GroupGoalJoinButton';
import GroupGoalParticipantList from './GroupGoalParticipationList';

const GroupGoalDetail = ({ title, description, startDate, endDate, headCount, amount }: IGoalDetail) => {
  return (
    <Wrapper>
      <GoalInfo />
      <GoalPeriodCard />
      <GoalDescCard />
      <GroupGoalParticipantList />
      <GroupGoalJoinButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default GroupGoalDetail;
