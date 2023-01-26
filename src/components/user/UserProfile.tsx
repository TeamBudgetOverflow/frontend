import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ProfileImg from '../common/elem/ProfileImg';

import useUserProfileData from '../../hooks/useUserProfileData';

import { userId } from '../../recoil/userAtoms';

const UserProfile = () => {
  const { id } = useRecoilValue(userId);
  const { isLoading, isError, profile } = useUserProfileData({
    getUserId: id,
  });

  if (isError || !profile)
    return (
      <Wrapper>
        <ErrorText>사용자 데이터를 불러오는 데 실패했습니다</ErrorText>
      </Wrapper>
    );

  return (
    <Wrapper>
      <ProfileImg size={52} url={profile.image} isLoading={isLoading} />
      <Nickname>{profile.nickname}</Nickname>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 8px 22px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: white;
`;

const LoadingText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font: ${(props) => props.theme.paragraphsP3R};
  color: ${(props) => props.theme.gray600};
`;

const ErrorText = styled(LoadingText)`
  color: red;
`;

const Nickname = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

export default UserProfile;
