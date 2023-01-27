import { useQuery } from 'react-query';
import { goalApi } from '../apis/client';

const useSearchFilteredData = (keyword: string, sorted: string, max: number, min: number, orderd: string) => {
  const { isLoading, isError, data } = useQuery(
    'getSearchResult',
    () => goalApi.getGoalsByWord(keyword, sorted, max, min, orderd),
    {
      onSuccess: (data) => {
        return data;
      },
      onError: () => {
        alert('목표를 검색할 수 없습니다.');
      },
    }
  );

  return { isLoading, isError, data };
};

export default useSearchFilteredData;
