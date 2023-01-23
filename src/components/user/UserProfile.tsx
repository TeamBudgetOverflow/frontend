import React from 'react';
import styled from 'styled-components';
import { IUserProfile } from '../../interfaces/interfaces';

import ProfileImg from '../common/elem/ProfileImg';

const UserProfile = ({ profile }: { profile: IUserProfile }) => {
  return (
    <Wrapper>
      <ProfileImg size={52} url={profile.image} />
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

const Nickname = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

export default UserProfile;
