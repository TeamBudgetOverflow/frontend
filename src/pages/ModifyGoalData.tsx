import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import InfoLoading from '../components/common/alert/InfoLoading';
import InfoError from '../components/common/alert/InfoError';
import GoalAccountInfo from '../components/goal/goalDetail/GoalAccountInfo';
import GoalDataInput from '../components/goal/modify/GoalDataInput';

import { goalDetail } from '../recoil/goalsAtoms';
import { userId } from '../recoil/userAtoms';

import useGoalState, { GoalState } from '../hooks/useGoalState';
import useIsManual from '../hooks/useIsManual';

import { participantFinder } from '../utils/goalInfoChecker';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const ModifyGoalData = () => {
  RouteChangeTracker();
  const { id: goalId, type } = useParams();
  const { id: loginUserId } = useRecoilValue(userId);
  const savedGoalDetail = useRecoilValue(goalDetail);

  const userInfo = participantFinder(savedGoalDetail.members, loginUserId);
  const { isLoading, isError, isManual } = useIsManual({ accountId: userInfo.accountId });

  const { state } = useGoalState({
    startDate: new Date(savedGoalDetail.startDate),
    endDate: new Date(savedGoalDetail.endDate),
  });

  if (isLoading) return <InfoLoading />;
  if (isError) return <InfoError />;

  return (
    <Wrapper>
      <GoalDataInput
        goalId={Number(goalId)}
        isEditable={state === GoalState.waiting && savedGoalDetail.members.length === 1}
        isGroup={type === 'group'}
        initVal={{
          emoji: !savedGoalDetail.emoji ? '' : savedGoalDetail.emoji,
          title: savedGoalDetail.title,
          description: savedGoalDetail.description,
          amount: savedGoalDetail.amount,
          hashTag: savedGoalDetail.hashTag,
          startDate: new Date(savedGoalDetail.startDate),
          endDate: new Date(savedGoalDetail.endDate),
          headCount: savedGoalDetail.headCount,
          isPrivate: savedGoalDetail.isPrivate,
          isManual: isManual,
          accountId: userInfo.accountId,
        }}
        createdAt={savedGoalDetail.createdAt}
      />
      <GoalAccountInfo accountId={userInfo.accountId} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 28px 22px 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 44px);
  height: calc(100% - 48px);
  overflow-y: auto;
  background-color: white;
`;

export default ModifyGoalData;
