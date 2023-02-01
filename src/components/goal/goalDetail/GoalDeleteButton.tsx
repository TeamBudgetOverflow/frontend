import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import TextButton from '../../common/elem/TextButton';

import { goalApi } from '../../../apis/client';

const GoalDeleteButton = ({ goalId }: { goalId: number }) => {
  const navigate = useNavigate();
  const { mutate } = useMutation('deleteGoal', () => goalApi.deleteGoal(goalId), {
    onSuccess: () => {
      navigate(-1);
    },
  });

  const handleDeleteGoalButton = () => {
    mutate();
  };

  return <TextButton text='삭제하기' onClickHandler={handleDeleteGoalButton} />;
};

export default GoalDeleteButton;
