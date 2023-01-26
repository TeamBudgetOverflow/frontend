import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { accountApi } from '../apis/client';
import { userId } from '../recoil/userAtoms';

const useBalanceData = ({ accountId }: { accountId: number }) => {
  const [balance, setBalance] = useState<number>(0);
  const { id: loginUserId } = useRecoilValue(userId);
  const { isLoading, isError } = useQuery(
    'accountBalance',
    () => accountApi.getAccountBalance({ userId: loginUserId, accountId }),
    {
      onSuccess: (data) => {
        setBalance(data);
      },
    }
  );

  return { isLoading, isError, balance };
};

export default useBalanceData;
