import React from 'react';
import { useMutation } from 'react-query';

import TextButton from '../../../common/elem/TextButton';

import { goalApi } from '../../../../apis/client';
import { useNavigate } from 'react-router-dom';

const WithDrawButton = ({ goalId }: { goalId: number }) => {
  const navigate = useNavigate();
  const { mutate } = useMutation('withDrawGoal', () => goalApi.withdrawGoal(goalId), {
    onSuccess: () => {
      navigate(0);
    },
  });
  const handleWithdrawGoalButton = () => {
    mutate();
  };

  return <TextButton text='그만하기' onClickHandler={handleWithdrawGoalButton} />;
};

export default WithDrawButton;
