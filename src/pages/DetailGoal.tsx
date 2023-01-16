import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { goalApi } from '../apis/client';

import GroupGoalDetail from '../components/goal/goalDetail/groupGoalDetail/GroupGoalDetail';

import { goalDetail, goalId } from '../recoil/goalsAtoms';

// TODO: 개인 목표 UI
const DetailGoal = () => {
  const { id } = useRecoilValue(goalId);

  const { data: goalDetailData } = useQuery('goalDetail', () => goalApi.getGoalDetail(id));

  const setGoalDetail = useSetRecoilState(goalDetail);
  const goalDetails = useRecoilValue(goalDetail);

  useEffect(() => {
    if (!goalDetailData) return;
    setGoalDetail(goalDetailData.goalDetail);
  }, [goalDetailData]);

  return (
    <Wrapper>
      <GroupGoalDetail
        key={goalDetails.id}
        createdUserId={goalDetails.createdUserId}
        title={goalDetails.title}
        amount={goalDetails.amount}
        startDate={goalDetails.startDate}
        recruitCount={goalDetails.recruitCount}
        headCount={goalDetails.headCount}
        endDate={goalDetails.endDate}
        description={goalDetails.description}
        recruitMembers={goalDetails.recruitMembers}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default DetailGoal;
