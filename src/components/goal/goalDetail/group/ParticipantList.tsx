import React from 'react';
import styled from 'styled-components';

import ParticipantCard from './ParticipantCard';

import { IMemeberInfo } from '../../../../interfaces/interfaces';

interface IParticipnatListProps {
  createdUserId: number;
  members: Array<IMemeberInfo>;
}

const ParticipantList = ({ createdUserId, members }: IParticipnatListProps) => {
  const creator = members
    .filter((m) => m.userId === createdUserId)
    .map((m) => <ParticipantCard type='creator' key={m.userId} info={m} />);

  const participants = members
    .filter((m) => m.userId !== createdUserId)
    .map((m) => <ParticipantCard type='participant' key={m.userId} info={m} />);

  return (
    <Wrapper>
      <Type>목표 개설자</Type>
      <CardWrapper>{creator}</CardWrapper>
      <Type>목표 참여자</Type>
      <ListWrapper>{participants.length === 0 ? <Info>아직 참여자가 없습니다</Info> : participants}</ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  width: calc(100% - 40px);
  height: calc(100% - 16px);
  border-radius: 16px;
  background-color: white;
`;

const Type = styled.div`
  width: 100%;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ListWrapper = styled(CardWrapper)`
  gap: 8px;
  overflow-y: auto;
`;

const Info = styled.div`
  padding: 10px 0;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray400};
`;

export default ParticipantList;
