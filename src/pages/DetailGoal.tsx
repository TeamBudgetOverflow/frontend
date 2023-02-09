import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import InfoError from '../components/common/alert/InfoError';
import InfoLoading from '../components/common/alert/InfoLoading';
import GoalInfoCard from '../components/goal/goalDetail/GoalInfoCard';
import GoalPeriodCard from '../components/goal/goalDetail/GoalPeriodCard';
import GoalDescCard from '../components/goal/goalDetail/GoalDescCard';
import GoalAccountInfo from '../components/goal/goalDetail/GoalAccountInfo';
import GoalBalanceCard from '../components/goal/goalDetail/GoalBalanceCard';
import JoinButton from '../components/goal/goalDetail/group/JoinButton';
import WithDrawButton from '../components/goal/goalDetail/group/WithdrawButton';
import GoalModifyButton from '../components/goal/goalDetail/GoalModifyButton';
import GoalDeleteButton from '../components/goal/goalDetail/GoalDeleteButton';
import ParticipantSection from '../components/goal/detail/ParticipantSection';
import GoalTagsCard from '../components/goal/goalDetail/GoalTagsCard';
import Info from '../components/common/alert/Info';

import { userId } from '../recoil/userAtoms';

import useGoalDetailData from '../hooks/useGoalDetailData';

import { GoalStatus } from '../interfaces/interfaces';

import RouteChangeTracker from '../shared/RouteChangeTracker';
import ReportModal from '../components/goal/detail/ReportModal';

const setButton = (
  goalId: number,
  createdUserId: number,
  loginUserId: number,
  status: GoalStatus,
  isGroup: boolean,
  isMember: boolean,
  deleteHandler: (result: boolean) => void
) => {
  if (loginUserId === createdUserId) {
    return (
      <GoalButtonSet>
        <GoalModifyButton isGroup={isGroup} />
        {status === GoalStatus.proceeding ? (
          <></>
        ) : (
          <GoalDeleteButton goalId={goalId} isDeletedHandler={deleteHandler} />
        )}
      </GoalButtonSet>
    );
  } else if (isGroup && status === GoalStatus.recruit) {
    return (
      <GoalButtonSet>{isMember ? <WithDrawButton goalId={goalId} /> : <JoinButton goalId={goalId} />}</GoalButtonSet>
    );
  }
};

const DetailGoal = () => {
  RouteChangeTracker();
  const { id: loginUserId } = useRecoilValue(userId);
  const { id: goalId } = useParams();
  if (!goalId) return <Navigate to='/' />;

  const {
    isLoading,
    isError,
    data,
    isGroupVal: isGroup,
    isMemberVal: isMember,
    status,
    accountId,
    balanceId,
  } = useGoalDetailData({ loginUserId, goalId });
  const [attainment, setAttainment] = useState(0);
  useEffect(() => {
    if (!data) return;
    const member = data.members.find((m) => m.userId === loginUserId);
    if (!member) return;
    setAttainment(member.attainment);
  }, [data]);
  const handleAttainmentModify = (attainment: number) => {
    setAttainment(attainment);
  };

  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);

  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const handleDelete = (result: boolean) => {
    setIsDeleted(result);
  };

  if (isLoading && !data) return <InfoLoading />;
  if (isError || !data) return <InfoError />;
  if (isDeleted)
    return (
      <Wrapper>
        <Info type='success'>목표 삭제가 완료되었습니다.</Info>
      </Wrapper>
    );

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
            attainment={attainment}
            reportModalHandler={() => setShowMenuModal(true)}
          />
          <GoalPeriodCard startDate={data.startDate} endDate={data.endDate} />
          <GoalDescCard description={data.description} />
          {data.hashTag.length === 1 && data.hashTag[0] === '' ? <></> : <GoalTagsCard hashTag={data.hashTag} />}
          {(isMember && status === GoalStatus.proceeding) || status === GoalStatus.done ? (
            <GoalBalanceCard
              balanceId={balanceId}
              accountId={accountId}
              maxBalance={data.amount}
              isDisabled={status === GoalStatus.done}
              progressModifyHandler={handleAttainmentModify}
            />
          ) : (
            <></>
          )}
        </TopContent>
        <BottomContent>
          {isMember ? <GoalAccountInfo accountId={accountId} /> : <></>}
          {isGroup ? (
            <ParticipantSection
              createdUserId={data.userId}
              curCount={data.curCount}
              headCount={data.headCount}
              members={data.members}
            />
          ) : (
            <></>
          )}
        </BottomContent>
      </DetailGoalWrapper>
      {setButton(Number(goalId), data.userId, loginUserId, status, isGroup, isMember, handleDelete)}
      <ReportModal goalId={Number(goalId)} showMenu={showMenuModal} closeMenuHandler={() => setShowMenuModal(false)} />
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
  gap: 20px;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
  background-color: ${(props) => props.theme.gray100};
  overflow-y: auto;
`;

const DetailGoalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const BottomContent = styled(TopContent)`
  gap: 20px;
`;

const GoalButtonSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export default DetailGoal;
