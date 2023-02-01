import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { goalApi } from '../apis/client';

import { ISearchGoal, ISearchGoalResult } from '../interfaces/interfaces';

const useGoalLookupData = (page: number) => {
  const navigate = useNavigate();

  const [goals, setUserGoals] = useState<Array<ISearchGoal>>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { isLoading, isError, refetch } = useQuery<ISearchGoalResult>('getGoals', () => goalApi.getGoals(page), {
    staleTime: 3000,
    onSuccess: (data) => {
      if (page === 1) {
        setUserGoals(data.result);
      } else {
        setUserGoals((prev) => [...prev, ...data.result]);
      }
      setIsLastPage(data.isLastPage);
    },
    onError: (error) => {
      if (error === 401) {
        navigate('/');
      }
    },
  });

  return { isLoading, isError, goals, isLastPage, refetch };
};

export default useGoalLookupData;
