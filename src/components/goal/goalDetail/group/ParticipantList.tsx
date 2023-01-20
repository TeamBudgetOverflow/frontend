import React from 'react';
import styled from 'styled-components';

import ParticipantCard from './ParticipantCard';

import { IMemeberInfo } from '../../../../interfaces/interfaces';

interface IParticipnatListProps {
  recruitMember: Array<IMemeberInfo>;
}

// TODO: 목표 참가자 달성률
const ParticipantList = ({ recruitMember }: IParticipnatListProps) => {
  const recruitMembers = recruitMember.map((member) => (
    <ParticipantCard
      key={member.userId}
      userId={member.userId}
      nickname={member.nickname}
      image={member.image}
      attainment={member.attainment}
    />
  ));

  return <Wrapper>{recruitMembers}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export default ParticipantList;
