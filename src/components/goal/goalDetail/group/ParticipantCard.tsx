import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProfileImg from '../../../common/elem/ProfileImg';

import { IMemeberInfo } from '../../../../interfaces/interfaces';

interface ParticipantCardProps {
  type: 'creator' | 'participant';
  info: IMemeberInfo;
}

const ParticipantCard = ({ type, info }: ParticipantCardProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <PaticpantInfoWrapper onClick={() => navigate(`/users/${info.userId}`)}>
        <ProfileImg url={info.image} size={40} borderColor={type === 'creator' ? '#2bc470' : ''} />
        <Nickname color={type === 'creator' ? '#2bc470' : ''}>{info.nickname}</Nickname>
      </PaticpantInfoWrapper>
      <Attainment color={type === 'creator' ? '#2bc470' : ''}>{`${info.attainment}%`}</Attainment>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 auto;
  width: 100%;
  border-radius: 16px;
  background-color: white;
`;

const PaticpantInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Nickname = styled.span<{ color: string }>`
  font: ${(props) => props.theme.paragraphsP3M};
  color: ${(props) => props.color};
`;

const Attainment = styled(Nickname)``;

export default ParticipantCard;
