import { useQuery } from 'react-query';
import { goalApi } from '../apis/client';

const useSearchFilteredData = (
  keyword: string,
  sorted: string,
  max: number,
  min: number,
  orderd: string,
  status: string
) => {
  const checkKeyword = (keyword: string) => {
    const checkKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (keyword.match(checkKR)) {
      const encodedKeyword = encodeURI(keyword);
      return encodedKeyword;
    } else {
      return keyword;
    }
  };

  const { isLoading, isError, data } = useQuery(
    'getSearchResult',
    () => goalApi.getGoalsByWord(checkKeyword(keyword), sorted, max, min, orderd, status),
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
