import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { accountApi } from '../apis/client';

import { userId } from '../recoil/userAtoms';

import { accountInfoFinder } from '../utils/accountInfoChecker';

import { IAccount } from '../interfaces/interfaces';

const useIsManual = ({ accountId }: { accountId: number }) => {
  const { id: loginUserId } = useRecoilValue(userId);
  const [isManual, setIsManual] = useState<boolean>(false);
  const { isLoading, isError } = useQuery<Array<IAccount>>('getAccounts', () => accountApi.getAccounts(loginUserId), {
    onSuccess: (data) => {
      const accountInfo = accountInfoFinder(data, accountId);
      setIsManual(accountInfo.bankId === 2);
    },
  });

  return { isLoading, isError, isManual };
};

export default useIsManual;
