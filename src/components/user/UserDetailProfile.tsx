import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import ProfileImg from '../common/elem/ProfileImg';

import useUserProfileData from '../../hooks/useUserProfileData';

interface UserDetailProfileProps {
  id: number;
  totalCnt: number;
  successCnt: number;
  workingCnt: number;
}

const UserDetailProfile = ({ id, totalCnt, successCnt, workingCnt }: UserDetailProfileProps) => {
  const { isLoading, isError, profile } = useUserProfileData({ getUserId: id });

  if (isLoading && !profile) return <>Loading...</>;
  if (isError || !profile) return <Navigate to='/' />;

  return (
    <Wrapper>
      <TopContent>
        <ProfileImg url={profile.image} size={85} />
        <UserGoalsStaticList>
          <UserGoalsStatic>
            <Info>{Math.trunc(totalCnt / 10) <= 0 ? `0${totalCnt}` : totalCnt}</Info>
            <Label>전체 목표</Label>
          </UserGoalsStatic>
          <UserGoalsStatic>
            <Info>{Math.trunc(successCnt / 10) <= 0 ? `0${successCnt}` : successCnt}</Info>
            <Label>성공한 목표</Label>
          </UserGoalsStatic>
          <UserGoalsStatic>
            <Info>{Math.trunc(workingCnt / 10) <= 0 ? `0${workingCnt}` : workingCnt}</Info>
            <Label>진행중 목표</Label>
          </UserGoalsStatic>
        </UserGoalsStaticList>
      </TopContent>
      <UserInfo>
        <Nickname>{profile?.nickname}</Nickname>
        <Description>{profile?.description}</Description>
      </UserInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 22px 0 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: calc(100% - 44px);
  height: calc(100% - 20px);
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Nickname = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

const Description = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const UserGoalsStaticList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const UserGoalsStatic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Info = styled.span`
  font: ${(props) => props.theme.headingH4};
`;

const Label = styled.span`
  font: ${(props) => props.theme.captionC2};
  text-align: center;
  word-break: keep-all;
`;

export default UserDetailProfile;
