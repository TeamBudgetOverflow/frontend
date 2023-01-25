import React from 'react';
import { useMutation } from 'react-query';

import TextButton from '../../../common/elem/TextButton';

import { goalApi } from '../../../../apis/client';

const WithDrawButton = ({ goalId }: { goalId: number }) => {
  const { mutate } = useMutation('withDrawGoal', () => goalApi.withdrawGoal(goalId));

  const handleWithdrawGoalButton = () => {
    mutate();
  };

  return <TextButton text='그만하기' onClickHandler={handleWithdrawGoalButton} />;
};

export default WithDrawButton;
