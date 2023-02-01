import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { IGoal } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';
import { useNavigate } from 'react-router-dom';

export enum FilterType {
  success,
  fail,
  waiting,
  working,
  none,
}

const useGoalsFilter = ({ userId }: { userId: number }) => {
  const [initialGoals, setInitialGoals] = useState<Array<IGoal>>([]);
  const navigate = useNavigate();
  const { isLoading, isError } = useQuery<Array<IGoal>>('userGoals', () => userAPI.getUserGoals(userId), {
    onSuccess: (data) => {
      setInitialGoals(data);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  const [filtered, setFiltered] = useState<Array<IGoal>>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.none);
  const handleFilterType = (type: FilterType) => {
    setFilterType((prev) => {
      if (prev === type) return FilterType.none;
      return type;
    });
  };

  useEffect(() => {
    setFiltered(() => {
      const goals = [...initialGoals];

      const filtered = goals.filter((goal) => {
        switch (filterType) {
          case FilterType.success:
            return new Date(goal.startDate).getTime() < new Date().getTime() && goal.attainment === 100;
          case FilterType.fail:
            return new Date(goal.startDate).getTime() < new Date().getTime() && goal.attainment < 100;
          case FilterType.waiting:
            return new Date(goal.startDate).getTime() > new Date().getTime();
          case FilterType.working:
            return (
              new Date(goal.startDate).getTime() < new Date().getTime() &&
              new Date(goal.endDate).getTime() > new Date().getTime()
            );
          case FilterType.none:
            return goal;
        }
      });

      return filtered;
    });
  }, [initialGoals, filterType]);

  const [orderType, setOrderType] = useState<'asc' | 'desc'>('desc');
  const handleOrderType = () => {
    setOrderType((prev) => {
      if (prev === 'asc') return 'desc';
      return 'asc';
    });
  };

  useEffect(() => {
    setFiltered((prev) => {
      const prevGoals = [...prev];
      prevGoals.sort((a, b) => {
        if (orderType === 'asc') {
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        }

        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
      return prevGoals;
    });
  }, [initialGoals, orderType, filterType]);

  return { isLoading, isError, filtered, filterType, orderType, handleFilterType, handleOrderType };
};

export default useGoalsFilter;
