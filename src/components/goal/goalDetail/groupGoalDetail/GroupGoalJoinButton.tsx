import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { goalApi } from '../../../../apis/client';

const GroupGoalJoinButton = () => {
  const param = useParams();

  const { mutate } = useMutation('joinGoal', () => goalApi.joinGoal(param.id));

  const handleJoinGoalButton = () => {
    mutate();
  };

  return (
    <JoinButtonWrapper>
      <JoinButton onClick={() => handleJoinGoalButton()}>참여하기</JoinButton>
    </JoinButtonWrapper>
  );
};

const JoinButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const JoinButton = styled.button`
  position: absolute;
  max-width: 370px;
  width: 90%;
  height: 51px;
  top: 725px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 12px 16.5px;
  gap: 10px;
`;

export default GroupGoalJoinButton;
