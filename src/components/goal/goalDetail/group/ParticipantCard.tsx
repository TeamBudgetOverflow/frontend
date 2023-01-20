import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProfileImg from '../../../common/elem/ProfileImg';

import { IMemeberInfo } from '../../../../interfaces/interfaces';

// TODO: 참가자 달성률
const ParticipantCard = ({ userId, nickname, image, attainment }: IMemeberInfo) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(`/users/${userId}`)}>
      <PaticpantInfoWrapper>
        <ProfileImg url={image} size={40} />
        <Nickname>{nickname}</Nickname>
      </PaticpantInfoWrapper>
      <Attainment>{`${attainment}%`}</Attainment>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 auto;
  width: calc(100% - 40px);
  border-radius: 16px;
  background-color: ${(props) => props.theme.gray100};
`;

const PaticpantInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Nickname = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Attainment = styled(Nickname)``;

export default ParticipantCard;
