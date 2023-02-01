import { useMutation } from 'react-query';

import { goalApi } from '../apis/client';
import { useNavigate } from 'react-router-dom';

const useJoinGoal = ({ goalId }: { goalId: number }) => {
  const navigate = useNavigate();
  const {
    isLoading,
    mutate: joinGoal,
    isError,
  } = useMutation('joinGoal', goalApi.joinGoal, {
    onSuccess: () => {
      setTimeout(() => navigate(`/goals/${goalId}`, { replace: true }), 2000);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  const handleJoin = (accountId: number) => {
    joinGoal({ goalId, accountId });
  };

  return {
    isLoading,
    isError,
    handleJoin,
  };
};

export default useJoinGoal;
