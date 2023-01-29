import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { goalApi } from '../apis/client';
import { ISearchGoal } from '../interfaces/interfaces';
import { groupGoals, impendingGroupGoals } from '../recoil/goalsAtoms';
import { dDayCalculator } from '../utils/dDayCalculator';

const useGoalLookupData = (pageNum: number) => {
  //   const setUserGoals = useSetRecoilState(groupGoals);
  //   const setImpendingGoals = useSetRecoilState(impendingGroupGoals);

  //   const goals = useRecoilValue(groupGoals);
  //   const impendingGoals = useRecoilValue(impendingGroupGoals);

  const [goals, setUserGoals] = useState<Array<ISearchGoal>>([]);
  const [impendingGoals, setImpendingGoals] = useState<Array<ISearchGoal>>([]);

  const { isLoading, isError, refetch } = useQuery<Array<ISearchGoal>>('getGoals', () => goalApi.getGoals(pageNum), {
    onSuccess: (data) => {
      setUserGoals((prev) => [...prev, ...data]);
      setImpendingGoals((prev) => [...prev, ...data]);
      // goals.sort((a, b) => dDayCalculator(new Date(a.startDate)) - dDayCalculator(new Date(b.startDate)))
    },
  });

  return { isLoading, isError, refetch, goals, impendingGoals };
};

export default useGoalLookupData;
