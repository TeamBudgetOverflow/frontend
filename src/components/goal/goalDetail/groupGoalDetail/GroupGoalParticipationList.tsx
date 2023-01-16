import React from 'react';
import styled from 'styled-components';
import { IParticapantInfo } from '../../../../interfaces/interfaces';
import GroupGoalParticipantCard from './GroupGoalParticipantCard';

interface IGoalParticipnatListProps {
  recruitMembers: Array<IParticapantInfo>;
  recruitCount: number;
}

// TODO: 목표 참가자 달성률
const GroupGoalParticipantList = ({ recruitMembers, recruitCount }: IGoalParticipnatListProps) => {
  const recruitMember = recruitMembers.map((member) => (
    <GroupGoalParticipantCard key={member.userId} userId={member.userId} nickname={member.nickname} img={member.img} />
  ));

  return (
    <GroupGoalParticipantListWrapper>
      <UpperLineWrapper>
        <ParticipantCount>
          참가자 {recruitMember.length} / {recruitCount}
        </ParticipantCount>
      </UpperLineWrapper>
      <ParticapantList>{recruitMember}</ParticapantList>
    </GroupGoalParticipantListWrapper>
  );
};

const GroupGoalParticipantListWrapper = styled.div`
  width: 100%;
  height: 305px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const UpperLineWrapper = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ParticipantCount = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const ParticapantList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  overflow-y: auto;
`;

export default GroupGoalParticipantList;
