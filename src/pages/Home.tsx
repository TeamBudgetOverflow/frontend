import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import HomeGuide from '../components/guide/HomeGuide';
import UserProfile from '../components/user/UserProfile';
import MyGoalCard from '../components/goal/MyGoalCard';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';
import AddGoalBtn from '../components/common/elem/btn/AddGoalBtn';

import { isGuideDone, userId } from '../recoil/userAtoms';

import useBanksData from '../hooks/useBanksData';
import useUserGoalsData from '../hooks/useUserGoalsData';
import useBadgesData from '../hooks/useBadgesData';

import RouteChangeTracker from '../shared/RouteChangeTracker';

import { GoalStatus, GoalStatusStringtoType } from '../interfaces/interfaces';

const Home = () => {
  const { home } = useRecoilValue(isGuideDone);
  const [showGuideUI, setShowGuideUI] = useState(false);
  useEffect(() => {
    const isNewComer = localStorage.getItem('isNewComer') === 'true' ? true : false;
    if (isNewComer && !home) setShowGuideUI(true);
  }, []);

  const setIsGuideDone = useSetRecoilState(isGuideDone);
  const handleFinishGuide = () => {
    setShowGuideUI(false);
    setIsGuideDone({ home: true });
  };

  RouteChangeTracker();
  useBanksData();
  const { id } = useRecoilValue(userId);
  const { isLoading, isError, goals } = useUserGoalsData({ getUserId: Number(id) });
  useBadgesData();

  if (showGuideUI) return <HomeGuide closeHandler={handleFinishGuide} />;

  return (
    <Wrapper>
      <UserProfile />
      <ContentWrapper>
        {isLoading || !goals ? (
          <Alert showBgColor={true}>
            <LoadingMsg />
          </Alert>
        ) : isError ? (
          <Alert showBgColor={true}>
            <ErrorMsg />
          </Alert>
        ) : goals.filter((goal) => GoalStatusStringtoType(goal.status) !== GoalStatus.done).length === 0 ? (
          <EmptyData>
            <EmptyDataContent>
              <Img src={require('../assets/icons/goalEmpty.png')} />
              <InfoText>{`아직 목표가 없어요.\n목표를 추가하거나, 목표 조회를 통해 \n목표에 참여해 보세요.`}</InfoText>
            </EmptyDataContent>
          </EmptyData>
        ) : (
          <>
            <>
              {goals
                .filter((goal) => GoalStatusStringtoType(goal.status) === GoalStatus.proceeding)
                .sort((a, b) => {
                  if (new Date(a.endDate).getTime() < new Date(b.endDate).getTime()) {
                    return -1;
                  }

                  return 0;
                })
                .map((goal) => (
                  <MyGoalCard key={goal.goalId} goal={goal} />
                ))}
            </>
            <>
              {goals
                .filter((goal) => GoalStatusStringtoType(goal.status) === GoalStatus.recruit)
                .sort((a, b) => {
                  if (new Date(a.startDate).getTime() < new Date(b.startDate).getTime()) {
                    return -1;
                  }

                  return 0;
                })
                .map((goal) => (
                  <MyGoalCard key={goal.goalId} goal={goal} />
                ))}
            </>
          </>
        )}
      </ContentWrapper>
      <AddGoalBtn />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.gray100};
`;

const EmptyData = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const EmptyDataContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Img = styled.img`
  width: 243px;
  height: 239px;
`;

const InfoText = styled.div`
  text-align: center;
  font: ${(props) => props.theme.paragraphsP3R};
  color: ${(props) => props.theme.gray700};
  line-height: 150%;
  white-space: pre-wrap;
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px 22px;
  gap: 8px;
  overflow-y: auto;
`;

export default Home;
