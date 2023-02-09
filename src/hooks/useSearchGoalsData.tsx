import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { goalApi } from '../apis/client';

import { ISearchFilter, ISearchGoal, ISearchGoalResult } from '../interfaces/interfaces';

import { groupGoals, isSearchGoalLastPage, searchFilters, searchGoalLastUpdate } from '../recoil/goalsAtoms';

const useSearchGoalsData = ({ initVal }: { initVal: Array<ISearchGoal> }) => {
  const navigate = useNavigate();
  const savedSearchGoals = useRecoilValue(groupGoals);

  const [searchResult, setSearchResult] = useState<Array<ISearchGoal>>(initVal);
  const resetIsLastPage = () => {
    saveIsLastPage(false);
  };
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const saveSearchFilters = useSetRecoilState(searchFilters);
  const saveSearchGoals = useSetRecoilState(groupGoals);
  const saveIsLastPage = useSetRecoilState(isSearchGoalLastPage);
  const saveLastUpdate = useSetRecoilState(searchGoalLastUpdate);

  const { isLoading, isError, mutate } = useMutation<ISearchGoalResult, unknown, ISearchFilter>(
    'getSearchResult',
    goalApi.getGoalsByWord,
    {
      onSuccess: (data, params) => {
        saveSearchFilters(params);
        if (params.cursor === 0 && params.goalId === 0) {
          setSearchResult(data.result);
          saveSearchGoals(data.result);
          saveIsLastPage(data.isLastPage);
          saveLastUpdate(new Date());
          setTotalCnt(Number(data.count));
          return;
        }

        setSearchResult((prev) => [...prev, ...data.result]);
        saveSearchGoals([...savedSearchGoals, ...data.result]);
        saveIsLastPage(data.isLastPage);
        saveLastUpdate(new Date());
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  return { isLoading, isError, searchResult, totalCnt, mutate, resetIsLastPage };
};

export default useSearchGoalsData;
