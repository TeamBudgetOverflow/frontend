import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { goalApi } from '../apis/client';
import { ISearchGoal } from '../interfaces/interfaces';

const useGoalLookupData = (pageNum: number) => {
  const navigate = useNavigate();

  const [goals, setUserGoals] = useState<Array<ISearchGoal>>([]);
  const [impendingGoals, setImpendingGoals] = useState<Array<ISearchGoal>>([]);

  const { isLoading, isError, refetch } = useQuery<Array<ISearchGoal>>('getGoals', () => goalApi.getGoals(pageNum), {
    enabled: false,
    staleTime: 3000,
    onSuccess: (data) => {
      if (data.length !== 0) {
        setUserGoals((prev) => [...prev, ...data]);
        setImpendingGoals((prev) => [...prev, ...data]);
      }

      // goals.sort((a, b) => dDayCalculator(new Date(a.startDate)) - dDayCalculator(new Date(b.startDate)))
    },
    onError: (error) => {
      if (error === 401) {
        navigate('/');
      }
    },
  });

  return { isLoading, isError, refetch, goals, impendingGoals };
};

export default useGoalLookupData;
