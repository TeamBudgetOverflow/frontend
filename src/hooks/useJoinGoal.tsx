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
      setTimeout(() => navigate(`/goals/${goalId}`));
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
