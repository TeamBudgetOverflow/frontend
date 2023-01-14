import React from 'react';
import styled from 'styled-components';

import GoalDescCard from '../GoalDescCard';
import GoalInfo from '../GoalInfoCard';
import GoalPeriodCard from '../GoalPeriodCard';
import GroupGoalJoinButton from './GroupGoalJoinButton';
import GroupGoalParticipantList from './GroupGoalParticipationList';

export interface IGoalDetail {
  id?: number;
  title: string;
  description: string;
  isPrivate?: boolean;
  hashtag?: Array<string>;
  amount: number;
  attainment?: number;
  startDate: Date;
  endDate: Date;
  headCount: number;
}

const GroupGoalDetail = ({ title, description, startDate, endDate, headCount, amount }: IGoalDetail) => {
  return (
    <Wrapper>
      <GoalInfo title={title} startDate={startDate} headCount={headCount} amount={amount} />
      <GoalPeriodCard startDate={startDate} endDate={endDate} />
      <GoalDescCard description={description} />
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
