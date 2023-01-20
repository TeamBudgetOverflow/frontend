import React from 'react';
import styled from 'styled-components';
import { IMemeberInfo } from '../../../../interfaces/interfaces';
import ProfileImg from '../../../common/elem/ProfileImg';

// TODO: 참가자 달성률
const ParticipantCard = ({ nickname, img }: IMemeberInfo) => {
  return (
    <Wrapper>
      <PaticpantInfoWrapper>
        <ProfileImg url={img} size={25} />
        <Nickname>{nickname}</Nickname>
      </PaticpantInfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  height: 60px;
  border-radius: 16px;
  flex: 0 0 auto;
  background-color: beige;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const PaticpantInfoWrapper = styled.div`
  margin: 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Nickname = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;

export default ParticipantCard;
