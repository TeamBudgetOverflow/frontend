import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { goalApi } from '../apis/client';
import { ISearchFilterQueriesType, ISearchGoalResult } from '../interfaces/interfaces';

const useSearchFilteredData = (queries: ISearchFilterQueriesType) => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery<ISearchGoalResult>(
    'getSearchResult',
    () => goalApi.getGoalsByWord(queries),
    {
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  return { isLoading, isError, data };
};

export default useSearchFilteredData;
