import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { goalApi } from '../apis/client';

import { ISearchGoal } from '../interfaces/interfaces';

const useGoalLookupImpendingData = () => {
  const navigate = useNavigate();

  const [impendingGoals, setImpendingGoals] = useState<Array<ISearchGoal>>([]);

  const { isLoading, isError } = useQuery<Array<ISearchGoal>, unknown>('getImpendingGoals', goalApi.getImpendingGoals, {
    onSuccess: (data) => {
      if (data !== undefined) {
        return setImpendingGoals(data);
      }
    },
    onError: (error) => {
      if (error === 401) {
        navigate('/');
      }
    },
  });

  return { isLoading, isError, impendingGoals };
};

export default useGoalLookupImpendingData;
