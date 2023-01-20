import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import TextButton from '../../../common/elem/TextButton';

import { goalApi } from '../../../../apis/client';

const WithDrawButton = () => {
  const param = useParams();

  const { mutate } = useMutation('withDrawGoal', () => goalApi.withdrawGoal(param.id));

  const handleWithdrawGoalButton = () => {
    mutate();
  };

  return <TextButton text='그만하기' onClickHandler={handleWithdrawGoalButton} />;
};

export default WithDrawButton;
