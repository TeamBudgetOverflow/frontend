import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';

import { userId } from '../recoil/userAtoms';

import { IPostAccount, IPostAutoAccount } from '../interfaces/interfaces';

import { accountApi } from '../apis/client';

const useAccntAutoPost = ({ acctInfo }: { acctInfo: IPostAccount }) => {
  const { id: loginUserId } = useRecoilValue(userId);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: accountId,
    mutate,
  } = useMutation<number, unknown, IPostAutoAccount>('postAccount', accountApi.createAutoAccount, {
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });
  const handlePostAccount = () => {
    mutate({ userId: loginUserId, acctInfo });
  };

  return {
    isLoading,
    isError,
    accountId,
    handlePostAccount,
  };
};

export default useAccntAutoPost;
