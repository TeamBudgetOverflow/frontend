import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import GoalDescCard from '../GoalDescCard';
import GoalInfo from '../GoalInfoCard';
import GoalPeriodCard from '../GoalPeriodCard';
import GroupGoalJoinButton from './GroupGoalJoinButton';
import GroupGoalParticipantList from './GroupGoalParticipationList';
import GroupGoalModifyButton from '../GoalModifyButton';
import GoalDeleteButton from '../GoalDeleteButton';
import GroupGoalWithDrawButton from './GroupGoalWithdrawButton';

import { IGoalDetail } from '../../../../interfaces/interfaces';

import { userInfo } from '../../../../recoil/atoms';

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

  const buttonSet = (id: number) => {
    const findId = recruitMembers.findIndex((member) => member.userId === id);

    if (id === createdUserId) {
      return (
        <GoalButtonSet>
          <GroupGoalModifyButton />
          <GoalDeleteButton />
        </GoalButtonSet>
      );
    }

    if (id !== createdUserId && findId !== -1) {
      return (
        <GoalButtonSet>
          <GroupGoalWithDrawButton />
        </GoalButtonSet>
      );
    }

    if (id !== createdUserId && findId === -1) {
      return (
        <GoalButtonSet>
          <GroupGoalJoinButton />
        </GoalButtonSet>
      );
    }
  };

  return (
    <Wrapper>
      <GoalInfo title={title} startDate={startDate} headCount={headCount} recruitCount={recruitCount} amount={amount} />
      <GoalPeriodCard startDate={startDate} endDate={endDate} />
      <GoalDescCard description={description} />
      <GroupGoalParticipantList recruitMembers={recruitMembers} recruitCount={recruitCount} />
      {buttonSet(id)}
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
