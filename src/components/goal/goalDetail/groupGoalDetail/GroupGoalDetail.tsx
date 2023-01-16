import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import GoalDescCard from '../GoalDescCard';
import GoalInfo from '../GoalInfoCard';
import GoalPeriodCard from '../GoalPeriodCard';
import GroupGoalJoinButton from './GroupGoalJoinButton';
import GroupGoalParticipantList from './GroupGoalParticipationList';
import GroupGoalModifyButton from './GroupGoalModifyButton';
import GoalDeleteButton from '../GoalDeleteButton';

import { IParticapantInfo } from '../../../../interfaces/interfaces';

import { userInfo } from '../../../../recoil/atoms';

export interface IGoalDetail {
  createdUserId: number;
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

// TODO: 목표참가자 -> 목표 생성자 아이디가 아닌경우 목표 탈퇴
const GroupGoalDetail = ({
  createdUserId,
  title,
  description,
  startDate,
  endDate,
  recruitCount,
  headCount,
  amount,
  recruitMembers,
}: IGoalDetail) => {
  const { id } = useRecoilValue(userInfo);
  console.log(createdUserId, id);

  return (
    <Wrapper>
      <GoalInfo title={title} startDate={startDate} headCount={headCount} recruitCount={recruitCount} amount={amount} />
      <GoalPeriodCard startDate={startDate} endDate={endDate} />
      <GoalDescCard description={description} />
      <GroupGoalParticipantList recruitMembers={recruitMembers} recruitCount={recruitCount} />
      {createdUserId !== id ? (
        <GoalButtonSet>
          <GroupGoalJoinButton />
        </GoalButtonSet>
      ) : (
        <GoalButtonSet>
          <GroupGoalModifyButton />
          <GoalDeleteButton />
        </GoalButtonSet>
      )}
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

const GoalButtonSet = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export default GroupGoalDetail;
