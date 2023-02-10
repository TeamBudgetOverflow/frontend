import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { goalApi } from '../apis/client';

import { postGoal } from '../recoil/goalsAtoms';

const usePostGoal = ({ accountId }: { accountId: number }) => {
  const savedPostGoal = useRecoilValue(postGoal);
  const navigate = useNavigate();
  const { isLoading, isError, mutate } = useMutation<number>(
    'postGoal',
    () => goalApi.postGoal({ ...savedPostGoal, accountId }),
    {
      onSuccess: () => {
        setTimeout(() => navigate(`/home`, { replace: true }), 2000);
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );
  const handlePostGoal = () => {
    mutate();
  };

  return { isLoading, isError, handlePostGoal };
};

export default usePostGoal;
