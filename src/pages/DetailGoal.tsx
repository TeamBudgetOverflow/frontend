import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GroupGoalDetail from '../components/goal/goalDetail/groupGoalDetail/GroupGoalDetail';
import MyGoalDetail from '../components/goal/goalDetail/myGoalDetail/MyGoalDetail';

import { goalDetail, goalId } from '../recoil/goalsAtoms';

import { goalApi } from '../apis/client';

// TODO: 목표 대표 이미지 연결
const DetailGoal = () => {
  const { id } = useRecoilValue(goalId);
  const { isPrivate } = useRecoilValue(goalDetail);

  const { data: goalDetailData } = useQuery('goalDetail', () => goalApi.getGoalDetail(id));

  const setGoalDetail = useSetRecoilState(goalDetail);
  const goalDetails = useRecoilValue(goalDetail);

  useEffect(() => {
    if (!goalDetailData) return;
    setGoalDetail(goalDetailData.goalDetail);
  }, [goalDetailData]);

  return (
    <Wrapper>
      {isPrivate ? (
        <MyGoalDetail
          key={goalDetails.id}
          id={goalDetails.id}
          createdUserId={goalDetails.createdUserId}
          title={goalDetails.title}
          amount={goalDetails.amount}
          isPrivate={goalDetails.isPrivate}
          hashtag={goalDetails.hashtag}
          attainment={goalDetails.attainment}
          startDate={goalDetails.startDate}
          endDate={goalDetails.endDate}
          headCount={goalDetails.headCount}
          recruitCount={goalDetails.recruitCount}
          recruitMembers={goalDetails.recruitMembers}
          description={goalDetails.description}
        />
      ) : (
        <GroupGoalDetail
          key={goalDetails.id}
          id={goalDetails.id}
          createdUserId={goalDetails.createdUserId}
          title={goalDetails.title}
          amount={goalDetails.amount}
          isPrivate={goalDetails.isPrivate}
          hashtag={goalDetails.hashtag}
          attainment={goalDetails.attainment}
          startDate={goalDetails.startDate}
          endDate={goalDetails.endDate}
          headCount={goalDetails.headCount}
          recruitCount={goalDetails.recruitCount}
          recruitMembers={goalDetails.recruitMembers}
          description={goalDetails.description}
        />
      )}
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
