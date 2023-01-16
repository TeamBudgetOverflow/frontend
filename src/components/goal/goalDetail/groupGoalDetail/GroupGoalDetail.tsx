import React from 'react';
import styled from 'styled-components';
import { IParticapantInfo } from '../../../../interfaces/interfaces';

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
  recruitCount: number;
  headCount: number;
  recruitMembers: Array<IParticapantInfo>;
}

// TODO: 목표생성자 -> 목표 수정하기, 삭제하기 버튼
// TODO: 목표참가자 -> 목표 생성자 아이디가 아닌경우 목표 탈퇴
// TODO: 목표미참가자 -> 목표 생성자 아이디가 아니거나 참가자가 아닌 경우 참가 버튼
const GroupGoalDetail = ({
  title,
  description,
  startDate,
  endDate,
  recruitCount,
  headCount,
  amount,
  recruitMembers,
}: IGoalDetail) => {
  return (
    <Wrapper>
      <GoalInfo title={title} startDate={startDate} headCount={headCount} recruitCount={recruitCount} amount={amount} />
      <GoalPeriodCard startDate={startDate} endDate={endDate} />
      <GoalDescCard description={description} />
      <GroupGoalParticipantList recruitMembers={recruitMembers} recruitCount={recruitCount} />
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
