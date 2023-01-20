import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GoalInfoCard from '../components/goal/goalDetail/GoalInfoCard';
import GoalPeriodCard from '../components/goal/goalDetail/GoalPeriodCard';
import GoalDescCard from '../components/goal/goalDetail/GoalDescCard';
import GroupGoalParticipantList from '../components/goal/goalDetail/groupGoalDetail/GroupGoalParticipationList';
import GroupGoalJoinButton from '../components/goal/goalDetail/groupGoalDetail/GroupGoalJoinButton';
import GoalModifyButton from '../components/goal/goalDetail/GoalModifyButton';
import GoalDeleteButton from '../components/goal/goalDetail/GoalDeleteButton';
import GroupGoalWithDrawButton from '../components/goal/goalDetail/groupGoalDetail/GroupGoalWithdrawButton';
import MyGoalAccountInfoCard from '../components/goal/goalDetail/myGoalDetail/MyGoalAccountInfoCard';

import { userInfo } from '../recoil/userAtoms';
import { goalDetail, goalId } from '../recoil/goalsAtoms';

import { goalApi } from '../apis/client';

import { IGoalDetail } from '../interfaces/interfaces';

import { inProgressChecker, participantIdFinder, personalGoalChecker } from '../utils/detailGoalChecker';

const DetailGoal = () => {
  const { id: userId } = useRecoilValue(userInfo);
  const { id } = useRecoilValue(goalId);

  const { isLoading: isLoading, data: goalDetailData } = useQuery<IGoalDetail>('goalDetail', () =>
    goalApi.getGoalDetail(id)
  );
  const setGoalDetail = useSetRecoilState(goalDetail);
  const goalDetails = useRecoilValue(goalDetail);

  useEffect(() => {
    if (!goalDetailData) return;
    setGoalDetail(goalDetailData);
  }, [goalDetailData]);

  const buttonSet = (userId: number) => {
    const findId = goalDetails?.members.findIndex((member) => member.userId === userId);

    if (userId === goalDetails.createdUserId) {
      return (
        <GoalButtonSet>
          <GoalModifyButton />
          {inProgressChecker(goalDetails.startDate, goalDetails.endDate) ? (
            <></>
          ) : (
            <>
              <GoalDeleteButton />
            </>
          )}
        </GoalButtonSet>
      );
    }

    if (userId !== goalDetails.createdUserId && findId !== -1) {
      return (
        <GoalButtonSet>
          {inProgressChecker(goalDetails.startDate, goalDetails.endDate) ? (
            <></>
          ) : (
            <>
              <GroupGoalWithDrawButton />
            </>
          )}
        </GoalButtonSet>
      );
    }

    if (userId !== goalDetails.createdUserId && findId === -1) {
      return (
        <GoalButtonSet>
          {inProgressChecker(goalDetails.startDate, goalDetails.endDate) ? (
            <></>
          ) : (
            <>
              <GroupGoalJoinButton />
            </>
          )}
        </GoalButtonSet>
      );
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <DetailGoalWrapper>
          <GoalInfoCard
            userId={userId}
            title={goalDetails.title}
            emoji={goalDetails.emoji}
            startDate={goalDetails.startDate}
            headCount={goalDetails.headCount}
            recruitCount={goalDetails.curCount}
            amount={goalDetails.amount}
            attainment={goalDetails.attainment}
            recruitMember={goalDetails.members}
          />
          <GoalPeriodCard startDate={goalDetails.startDate} endDate={goalDetails.endDate} />
          <GoalDescCard description={goalDetails.description} />
          {participantIdFinder(goalDetails.members, userId) ? (
            <>
              <MyGoalAccountInfoCard />
            </>
          ) : (
            <></>
          )}

          {personalGoalChecker(goalDetails.curCount, goalDetails.headCount) ? (
            <>
              <PersonalGoalSpace></PersonalGoalSpace>
            </>
          ) : (
            <>
              <GroupGoalParticipantList recruitMember={goalDetails.members} headCount={goalDetails.headCount} />
            </>
          )}

          {buttonSet(userId)}
        </DetailGoalWrapper>
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

const DetailGoalWrapper = styled.div`
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PersonalGoalSpace = styled.div`
  width: 100%;
  height: 305px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default DetailGoal;
