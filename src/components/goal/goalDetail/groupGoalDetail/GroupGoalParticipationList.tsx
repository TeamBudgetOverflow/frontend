import React from 'react';
import styled from 'styled-components';

// TODO: 목표 참가자 리스트 get
const GroupGoalParticipantList = () => {
  return (
    <GroupGoalParticipantListWrapper>
      <div>participantList</div>
    </GroupGoalParticipantListWrapper>
  );
};

const GroupGoalParticipantListWrapper = styled.div`
  width: 90%;
  height: 258px;
  border-radius: 16px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default GroupGoalParticipantList;
