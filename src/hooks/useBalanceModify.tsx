import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { accountApi } from '../apis/client';

import { userId } from '../recoil/userAtoms';

import { IUpdateBalance } from '../interfaces/interfaces';

interface useBalanceModifyProps {
  balanceId: number;
  accountId: number;
  maxBalance: number;
}

const useBalanceModify = ({ balanceId, accountId, maxBalance }: useBalanceModifyProps) => {
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
  const { isLoading: isLoadingData, isError: isErrorData } = useQuery(
    'accountBalance',
    () => accountApi.getAccountBalance({ userId: loginUserId, accountId }),
    {
      onSuccess: (data) => {
        setInputVal(data);
        setBalance(data);
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  const [isValid, setIsValid] = useState<boolean>(false);
  const validate = () => {
    if (inputVal < 0) {
      return setIsValid(false);
    }
    if (inputVal > maxBalance) {
      return setIsValid(false);
    }

    setIsValid(true);
  };
  useEffect(() => {
    validate();
  }, [inputVal]);
  const navigate = useNavigate();
  const {
    isLoading: isLoadingModify,
    isError: isErrorModify,
    mutate,
  } = useMutation<unknown, unknown, IUpdateBalance>('updateBalance', accountApi.updateAccountBalance, {
    onSuccess: () => {
      handleModifyInput(false);
      navigate(0);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
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
    isValid,
    handleModifyInput,
    handleInputChange,
    handleBalanceModify,
  };
};

export default useBalanceModify;
