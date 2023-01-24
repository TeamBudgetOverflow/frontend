import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { userId } from '../recoil/userAtoms';

import { accountApi } from '../apis/client';

const useAccountsData = () => {
  const { id: loginUserId } = useRecoilValue(userId);
  const {
    isLoading,
    data: accounts,
    isError,
  } = useQuery('getAccounts', () => accountApi.getAccounts(loginUserId), {
    select: (data) => data.filter((v) => v.bankId !== 2),
  });

  return { isLoading, accounts, isError };
};

export default useAccountsData;
