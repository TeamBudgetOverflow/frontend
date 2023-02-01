import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import TextButton from '../../common/elem/TextButton';

import { goalApi } from '../../../apis/client';

interface GoalDeleteButtonProps {
  goalId: number;
  isDeletedHandler: (result: boolean) => void;
}

const GoalDeleteButton = ({ goalId, isDeletedHandler }: GoalDeleteButtonProps) => {
  const navigate = useNavigate();
  const { mutate } = useMutation('deleteGoal', () => goalApi.deleteGoal(goalId), {
    onSuccess: () => {
      isDeletedHandler(true);
      setTimeout(() => navigate(-1), 2000);
    },
  });

  const handleDeleteGoalButton = () => {
    mutate();
  };

  return <TextButton text='삭제하기' onClickHandler={handleDeleteGoalButton} />;
};

export default GoalDeleteButton;
