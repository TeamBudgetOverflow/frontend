import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { goalApi } from '../apis/client';

import {
  StatusStringtoType,
  SortStringtoType,
  ISearchFilter,
  ISearchGoal,
  ISearchGoalResult,
} from '../interfaces/interfaces';

import { searchFilters } from '../recoil/goalsAtoms';

const useSearchFilteredData = (params: ISearchFilter) => {
  const navigate = useNavigate();
  const setSearchFilters = useSetRecoilState(searchFilters);
  const [searchGoals, setSearchGoals] = useState<Array<ISearchGoal>>([]);
  const [lastReqPage, setLastReqPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const { isLoading, isError, mutate } = useMutation<ISearchGoalResult, unknown, ISearchFilter>(
    'getSearchResult',
    goalApi.getGoalsByWord,
    {
      onSuccess: (data) => {
        setSearchFilters({
          status: StatusStringtoType(params.status),
          sorted: SortStringtoType(params.sorted),
          min: params.min,
          max: params.max,
        });
        if (params.page === 1) {
          setSearchGoals(data.result);
        } else {
          setSearchGoals((prev) => [...prev, ...data.result]);
        }
        setIsLastPage(data.isLastPage);
        setTotalCnt(Number(data.count));
        setLastReqPage(params.page);
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );
  useEffect(() => {
    if (lastReqPage !== params.page) mutate(params);
  }, [params.keyword, params.status, params.ordered, params.sorted, params.page]);

  return { isLoading, isError, searchGoals, isLastPage, totalCnt };
};

export default useSearchFilteredData;
