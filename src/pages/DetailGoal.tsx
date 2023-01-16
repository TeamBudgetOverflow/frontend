import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GroupGoalDetail from '../components/goal/goalDetail/groupGoalDetail/GroupGoalDetail';
import MyGoalDetail from '../components/goal/goalDetail/myGoalDetail/MyGoalDetail';

import { goalDetail, goalId } from '../recoil/goalsAtoms';

import { goalApi } from '../apis/client';
import { IGetGoalDetail } from '../interfaces/interfaces';

// TODO: 목표 대표 이모지 연결
const DetailGoal = () => {
  const { id } = useRecoilValue(goalId);
  const { isPrivate } = useRecoilValue(goalDetail);

  const { data: goalDetailData } = useQuery<IGetGoalDetail>('goalDetail', () => goalApi.getGoalDetail(id));

  const setGoalDetail = useSetRecoilState(goalDetail);
  const goalDetails = useRecoilValue(goalDetail);

  useEffect(() => {
    if (!goalDetailData) return;
    setGoalDetail(goalDetailData.goalDetail);
  }, [goalDetailData]);

  // TODO: 개인 / 그룹 목표를 어떻게 구분해야할지에 따라 리팩터링
  return (
    <Wrapper>
      {isPrivate ? (
        <MyGoalDetail key={goalDetails.id} goalDetail={goalDetails} />
      ) : (
        <GroupGoalDetail key={goalDetails.id} goalDetail={goalDetails} />
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
