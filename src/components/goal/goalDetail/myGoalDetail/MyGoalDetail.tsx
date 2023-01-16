import React from 'react';
import styled from 'styled-components';

import GoalInfo from '../GoalInfoCard';
import GoalPeriodCard from '../GoalPeriodCard';
import GoalModifyButton from '../GoalModifyButton';
import GoalDeleteButton from '../GoalDeleteButton';
import MyGoalAccountInfoCard from './MyGoalAccountInfoCard';

import { IGoalDetail } from '../../../../interfaces/interfaces';

// TODO: 개인 목표 연결 계좌정보 연결
const MyGoalDetail = ({ title, startDate, endDate, isPrivate, amount, attainment }: IGoalDetail) => {
  return (
    <Wrapper>
      <GoalInfo isPrivate={isPrivate} title={title} startDate={startDate} amount={amount} attainment={attainment} />
      <GoalPeriodCard startDate={startDate} endDate={endDate} />
      <MyGoalAccountInfoCard />
      <GoalButtonSet>
        <GoalModifyButton />
        <GoalDeleteButton />
      </GoalButtonSet>
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

export default MyGoalDetail;
