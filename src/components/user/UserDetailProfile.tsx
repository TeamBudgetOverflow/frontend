import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ProfileImg from '../common/elem/ProfileImg';

import { userAPI } from '../../apis/client';

import { IUserProfile } from '../../interfaces/interfaces';

import { userInfo, userProfile } from '../../recoil/atoms';

interface UserDetailProfileProps {
  userId: number;
  successGoalsCnt: number;
  workingGoalsCnt: number;
}

const UserDetailProfile = ({
  userId,
  successGoalsCnt,
  workingGoalsCnt,
}: UserDetailProfileProps) => {
  const { id } = useRecoilValue(userInfo);
  const [profile, setProfile] = useState<IUserProfile>({
    img: '',
    nickname: '',
    description: '',
  });
  const defaultProfile = useRecoilValue(userProfile);

  useEffect(() => {
    if (userId !== id) {
      async () => {
        try {
          const resp = await userAPI.getUserProfile(userId);
          setProfile(resp);
        } catch (e) {
          alert(e);
        }
      };
    }

    setProfile(defaultProfile);
  }, [userId, id, defaultProfile]);

  return (
    <Wrapper>
      <TopContent>
        <ProfileImg
          url={
            profile?.img.length === 0
              ? require('../../assets/img/default.png')
              : profile?.img
          }
          size={85}
        />
        <UserGoalsStaticList>
          <UserGoalsStatic>
            <Info>{successGoalsCnt}</Info>
            <Label>성공한 목표</Label>
          </UserGoalsStatic>
          <UserGoalsStatic>
            <Info>{workingGoalsCnt}</Info>
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
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 120px;
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
  padding: 30px 10px 30px 0;
  display: flex;
  flex-direction: row;
  gap: 40px;
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
