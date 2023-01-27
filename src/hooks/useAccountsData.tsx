import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { accountApi } from '../apis/client';

import { userId } from '../recoil/userAtoms';

import { IAccount } from '../interfaces/interfaces';

const useAccountsData = () => {
  const { id: loginUserId } = useRecoilValue(userId);
  const [accounts, setAccounts] = useState<Array<IAccount>>([]);
  const navigate = useNavigate();
  const { isLoading, isError } = useQuery<Array<IAccount>>('getAccounts', () => accountApi.getAccounts(loginUserId), {
    onSuccess: (data) => {
      setAccounts(data);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  return { isLoading, isError, accounts };
};

export default useAccountsData;
