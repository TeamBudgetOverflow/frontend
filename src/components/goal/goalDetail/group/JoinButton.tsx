import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import TextButton from '../../../common/elem/TextButton';

import { goalApi } from '../../../../apis/client';

// TODO : 공통 버튼 컴포넌트 리팩터링
const JoinButton = () => {
  const param = useParams();

  const { mutate } = useMutation('joinGoal', () => goalApi.joinGoal(param.id));

  const handleJoinGoalButton = () => {
    mutate();
  };

  return <TextButton text='참여하기' onClickHandler={handleJoinGoalButton} />;
};

export default JoinButton;
