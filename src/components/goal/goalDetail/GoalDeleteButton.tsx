import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import TextButton from '../../common/elem/TextButton';

import { goalApi } from '../../../apis/client';

// TODO : 공통 버튼 컴포넌트 리팩터링
const GoalDeleteButton = () => {
  const param = useParams();

  const { mutate } = useMutation('deleteGoal', () => goalApi.deleteGoal(param.id));

  const handleDeleteGoalButton = () => {
    mutate();
  };

  return <TextButton text='삭제하기' onClickHandler={handleDeleteGoalButton} />;
};

export default GoalDeleteButton;
