import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { goalApi } from '../apis/client';

import { ISearchGoal, ISearchGoalResult } from '../interfaces/interfaces';
import { groupGoals, isSearchGoalLastPage, searchGoalLastUpdate } from '../recoil/goalsAtoms';

interface useGoalLookupData {
  initVal: Array<ISearchGoal>;
}

const useGoalLookupData = ({ initVal }: useGoalLookupData) => {
  const navigate = useNavigate();
  const savedLookupGoals = useRecoilValue(groupGoals);

  const [goals, setGoals] = useState<Array<ISearchGoal>>(initVal);
  const saveLookupGoals = useSetRecoilState(groupGoals);
  const saveIsLastPage = useSetRecoilState(isSearchGoalLastPage);
  const saveLastUpdate = useSetRecoilState(searchGoalLastUpdate);

  const { isLoading, isError, mutate } = useMutation<ISearchGoalResult, unknown, number>('getGoals', goalApi.getGoals, {
    onSuccess: (data, cursor) => {
      if (cursor === 0) {
        setGoals([...data.result]);
        saveLookupGoals([...data.result]);
        saveIsLastPage(data.isLastPage);
        saveLastUpdate(new Date());
        return;
      }

      setGoals((prev) => [...prev, ...data.result]);
      saveLookupGoals([...savedLookupGoals, ...data.result]);
      saveIsLastPage(data.isLastPage);
      saveLastUpdate(new Date());
    },
    onError: (error) => {
      if (error === 401) {
        navigate('/');
      }
    },
  });

  return { isLoading, isError, goals, mutate };
};

export default useGoalLookupData;
