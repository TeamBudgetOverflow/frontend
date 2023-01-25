import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';

import { userId } from '../recoil/userAtoms';

import { accountApi } from '../apis/client';
import { useNavigate } from 'react-router-dom';

interface useAccntManualPostProps {
  type: 'join' | 'post';
  goalId: number;
}

const useAccntManualPost = ({ type, goalId }: useAccntManualPostProps) => {
  const { id: loginUserId } = useRecoilValue(userId);
  const navigate = useNavigate();
  const {
    isLoading,
    mutate: createManualAccnt,
    isError,
  } = useMutation<number>('createManualAccount', () => accountApi.createManualAccount(loginUserId), {
    onSuccess: (data) => {
      if (type === 'join') {
        setTimeout(() => navigate(`/goals/join/${goalId}/accounts/${data}`, { replace: true }), 2000);
      }

      if (type === 'post') {
        setTimeout(() => navigate(`/goals/post/${data}`, { replace: true }), 2000);
      }
    },
  });

  return { isLoading, isError, createManualAccnt };
};

export default useAccntManualPost;
