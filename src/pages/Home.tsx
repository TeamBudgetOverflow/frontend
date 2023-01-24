import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import UserProfile from '../components/user/UserProfile';
import MyGoalCard from '../components/goal/MyGoalCard';
import Icon from '../components/common/elem/Icon';
import Alert from '../components/common/alert/Alert';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import ErrorMsg from '../components/common/elem/ErrorMsg';

import { userId, userGoals, userProfile } from '../recoil/userAtoms';

import useBanksData from '../hooks/useBanksData';
import useUserData from '../hooks/useUserData';

const Home = () => {
  useBanksData();
  const { id } = useRecoilValue(userId);
  const { isLoading, isError } = useUserData({ loginUserId: id, getUserId: id });
  const profile = useRecoilValue(userProfile);
  const goals = useRecoilValue(userGoals);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <UserProfile profile={profile} />
      <ContentWrapper>
        {isLoading ? (
          <Alert height={150} showBgColor={true}>
            <LoadingMsg />
          </Alert>
        ) : isError ? (
          <Alert height={150} showBgColor={true}>
            <ErrorMsg />
          </Alert>
        ) : (
          goals.map((goal) => <MyGoalCard key={goal.goalId} goal={goal} />)
        )}
        <AddGoalBtn onClick={() => navigate('/goals/post/type')}>
          <IconWrapper>
            <Icon
              size={20}
              color={'gray400'}
              path='M19.3333 11.3332H11.3333V19.3332H8.66663V11.3332H0.666626V8.6665H8.66663V0.666504H11.3333V8.6665H19.3333V11.3332Z'
            />
          </IconWrapper>
        </AddGoalBtn>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.gray100};
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px;
  gap: 8px;
`;

const AddGoalBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
  border-radius: 12px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

export default Home;
