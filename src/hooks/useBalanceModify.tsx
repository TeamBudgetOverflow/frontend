import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { accountApi } from '../apis/client';

import { userId } from '../recoil/userAtoms';

import { IUpdateBalance } from '../interfaces/interfaces';

const useBalanceModify = ({ balanceId, accountId }: { balanceId: number; accountId: number }) => {
  const [isModify, setIsModify] = useState<boolean>(false);
  const handleModifyInput = (isModify: boolean) => {
    setIsModify(isModify);
  };

  const [inputVal, setInputVal] = useState<number>(0);
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(Number(e.currentTarget.value));
  };

  const { id: loginUserId } = useRecoilValue(userId);
  const [balance, setBalance] = useState<number>(0);
  const {
    isLoading: isLoadingData,
    isError: isErrorData,
    refetch,
  } = useQuery('accountBalance', () => accountApi.getAccountBalance({ userId: loginUserId, accountId }), {
    onSuccess: (data) => {
      setInputVal(data);
      setBalance(data);
    },
  });

  const navigate = useNavigate();
  const {
    isLoading: isLoadingModify,
    isError: isErrorModify,
    mutate,
  } = useMutation<unknown, unknown, IUpdateBalance>('updateBalance', accountApi.updateAccountBalance, {
    onSuccess: () => {
      handleModifyInput(false);
      navigate(0);
      // refetch();
    },
  });
  const handleBalanceModify = () => {
    mutate({ balanceId, value: inputVal });
  };

  return {
    isLoadingData,
    isErrorData,
    isLoadingModify,
    isErrorModify,
    isModify,
    inputVal,
    balance,
    handleModifyInput,
    handleInputChange,
    handleBalanceModify,
  };
};

export default useBalanceModify;
