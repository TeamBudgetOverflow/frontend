import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ProfileImg from '../common/elem/ProfileImg';
import { userProfile } from '../../recoil/atoms';

const UserProfile = () => {
  const profile = useRecoilValue(userProfile);

  return (
    <Wrapper>
      <ProfileImg
        size={52}
        url={
          profile.img.length === 0
            ? require('../../assets/img/default.png')
            : profile.img
        }
      />
      <Nickname>{profile.nickname}</Nickname>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Nickname = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

export default UserProfile;
