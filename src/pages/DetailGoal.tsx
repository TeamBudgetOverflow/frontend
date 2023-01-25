import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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

import { userId } from '../recoil/userAtoms';

import useGoalDetailData from '../hooks/useGoalDetailData';

const setButton = (
  goalId: number,
  createdUserId: number,
  loginUserId: number,
  isWorking: boolean,
  isGroup: boolean,
  isMember: boolean
) => {
  if (loginUserId === createdUserId) {
    return (
      <GoalButtonSet>
        <GoalModifyButton goalId={goalId} />
        {isWorking ? <></> : <GoalDeleteButton goalId={goalId} />}
      </GoalButtonSet>
    );
  } else if (isGroup && !isWorking) {
    return (
      <GoalButtonSet>{isMember ? <WithDrawButton goalId={goalId} /> : <JoinButton goalId={goalId} />}</GoalButtonSet>
    );
  }
};

const DetailGoal = () => {
  const { id: loginUserId } = useRecoilValue(userId);
  const { id: goalId } = useParams();
  if (!goalId) return <Navigate to='/' />;

  const {
    isLoading,
    isError,
    data,
    isGroupVal: isGroup,
    isMemberVal: isMember,
    isWorkingVal: isWorking,
  } = useGoalDetailData({ loginUserId, goalId });

  if (isLoading || !data) return <>Loading...</>;
  if (isError) return <Navigate to='/' />;

  return (
    <Wrapper>
      <DetailGoalWrapper>
        <TopContent>
          <GoalInfoCard
            emoji={data.emoji}
            title={data.title}
            amount={data.amount}
            startDate={data.startDate}
            curCount={data.curCount}
            headCount={data.headCount}
            isMember={isMember}
            attainment={data.members.find((m) => m.userId === loginUserId)?.attainment}
          />
          <GoalPeriodCard startDate={data.startDate} endDate={data.endDate} />
          <GoalDescCard description={data.description} />
        </TopContent>
        <BottomContent>
          {isMember ? (
            <>
              <SubTitle>연결 계좌 정보</SubTitle>
              <AccountInfoCard
                accntInfo={{ accountId: 0, bankId: 4, acctNo: '123412341234' }}
                selectHandler={() => {
                  console.log('직접 입력 계좌 잔액 수정');
                }}
              />
            </>
          ) : (
            <></>
          )}
          {isGroup ? (
            <>
              <SubTitle>참가자 {`${data.curCount} / ${data.headCount}`}</SubTitle>
              <ParticipantList recruitMember={data.members} />
            </>
          ) : (
            <></>
          )}
        </BottomContent>
      </DetailGoalWrapper>
      {setButton(Number(goalId), data.userId, loginUserId, isWorking, isGroup, isMember)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
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
