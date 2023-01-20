import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import GoalInfoCard from '../components/goal/goalDetail/GoalInfoCard';
import GoalPeriodCard from '../components/goal/goalDetail/GoalPeriodCard';
import GoalDescCard from '../components/goal/goalDetail/GoalDescCard';
import JoinButton from '../components/goal/goalDetail/group/JoinButton';
import WithDrawButton from '../components/goal/goalDetail/group/WithdrawButton';
import GoalModifyButton from '../components/goal/goalDetail/GoalModifyButton';
import GoalDeleteButton from '../components/goal/goalDetail/GoalDeleteButton';
import ParticipantList from '../components/goal/goalDetail/group/ParticipantList';
import AccountInfoCard from '../components/account/AccountInfoCard';

import { userInfo } from '../recoil/userAtoms';
import { goalDetail } from '../recoil/goalsAtoms';

import { goalApi } from '../apis/client';

import { IGoalDetail } from '../interfaces/interfaces';

import useLogout from '../hooks/useLogout';

import { inProgressChecker, participantIdFinder, personalGoalChecker } from '../utils/detailGoalChecker';
import { useParams } from 'react-router-dom';

const DetailGoal = () => {
  const { id: userId } = useRecoilValue(userInfo);
  const { id } = useParams();
  const logout = useLogout();
  const { isLoading: isLoading, data: goalDetailData } = useQuery<IGoalDetail>('goalDetail', () =>
    goalApi.getGoalDetail(Number(id)).catch((e) => {
      if (e.status === 410) {
        logout();
      }
    })
  );
  const setGoalDetail = useSetRecoilState(goalDetail);
  const goalDetails = useRecoilValue(goalDetail);

  useEffect(() => {
    if (!goalDetailData) return;
    setGoalDetail(goalDetailData);
  }, [goalDetailData]);
  const buttonSet = (userId: number) => {
    const findId = goalDetails?.members.findIndex((member) => member.userId === userId);

    if (userId === goalDetails.userId) {
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

    if (userId !== goalDetails.userId && findId !== -1) {
      return (
        <GoalButtonSet>
          {inProgressChecker(goalDetails.startDate, goalDetails.endDate) ? (
            <></>
          ) : (
            <>
              <WithDrawButton />
            </>
          )}
        </GoalButtonSet>
      );
    }

    if (userId !== goalDetails.userId && findId === -1) {
      return (
        <GoalButtonSet>
          {inProgressChecker(goalDetails.startDate, goalDetails.endDate) ? (
            <></>
          ) : (
            <>
              <JoinButton />
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
          <TopContent>
            <GoalInfoCard
              userId={userId}
              title={goalDetails.title}
              emoji={goalDetails.emoji}
              startDate={goalDetails.startDate}
              headCount={goalDetails.headCount}
              recruitCount={goalDetails.curCount}
              amount={goalDetails.amount}
              attainment={goalDetails.members.find((m) => m.userId === userId)?.attainment}
              recruitMember={goalDetails.members}
            />
            <GoalPeriodCard startDate={goalDetails.startDate} endDate={goalDetails.endDate} />
            <GoalDescCard description={goalDetails.description} />
          </TopContent>
          <BottomContent>
            {participantIdFinder(goalDetails.members, userId) ? (
              <>
                <SubTitle>연결 계좌 정보</SubTitle>
                <AccountInfoCard
                  accntInfo={{ id: 0, bankId: 4, accntNo: '123412341234' }}
                  selectHandler={() => {
                    console.log('계좌 설정 페이지');
                  }}
                />
              </>
            ) : (
              <></>
            )}

            {personalGoalChecker(goalDetails.curCount, goalDetails.headCount) ? (
              <></>
            ) : (
              <>
                <SubTitle>참가자 {`${goalDetails.curCount} / ${goalDetails.headCount}`}</SubTitle>
                <ParticipantList recruitMember={goalDetails.members} />
              </>
            )}
          </BottomContent>
        </DetailGoalWrapper>
      )}
      {buttonSet(userId)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
`;

const DetailGoalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  height: 100%;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

const BottomContent = styled(TopContent)`
  gap: 20px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const GoalButtonSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export default DetailGoal;
