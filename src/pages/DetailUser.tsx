import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import UserDetailProfile from '../components/user/UserDetailProfile';
import TextButton from '../components/common/elem/TextButton';

import useUserGoalsData from '../hooks/useUserGoalsData';
import UserDetailTab from '../components/user/UserDetailTabSection';

const DetailUser = () => {
  const { id } = useParams();
  if (!id) return <>잘못된 아이디 값입니다</>;

  // TODO: get user badges data
  const {
    isLoading: isLoadingGoals,
    isError: isErrorGoals,
    totalCnt,
    successCnt,
    workingCnt,
    data: goals,
  } = useUserGoalsData({ getUserId: Number(id) });

  const handleUserEdit = () => {
    console.log('edit user');
  };

  return (
    <Wrapper>
      <TopContent>
        <UserDetailProfile id={Number(id)} totalCnt={totalCnt} successCnt={successCnt} workingCnt={workingCnt} />
        <BtnWrapper>
          <TextButton text='프로필 수정' bgColor='gray' onClickHandler={handleUserEdit} />
        </BtnWrapper>
      </TopContent>
      <UserContentBox>
        <UserDetailTab
          isLoadingGoals={isLoadingGoals}
          isLoadingBadges={false}
          isErrorGoals={isErrorGoals}
          isErrorBadges={false}
          goals={goals}
          badges={[]}
        />
      </UserContentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
`;

const BtnWrapper = styled.div`
  padding: 20px 22px;
`;

const UserContentBox = styled.div`
  height: 70%;
`;

export default DetailUser;
