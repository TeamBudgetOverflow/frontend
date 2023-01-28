import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { goalApi } from '../apis/client';
import {
  ISearchFilterOrdered,
  ISearchFilterSorted,
  ISearchFilterStatus,
  ISearchGoalResult,
} from '../interfaces/interfaces';

const useSearchFilteredData = (
  searchKeyword: string,
  sorted: ISearchFilterSorted,
  max: number,
  min: number,
  orderd: ISearchFilterOrdered,
  status: ISearchFilterStatus,
  page: number
) => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery<ISearchGoalResult>(
    'getSearchResult',
    () => goalApi.getGoalsByWord(searchKeyword, sorted, max, min, orderd, status, page),
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
