import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { goalApi } from '../apis/client';

export enum Status {
  total,
  recruiting,
  proceeding,
}

const filterConditionStatusKR = (condition: Status) => {
  switch (condition) {
    case Status.recruiting:
      return '모집중';
    case Status.proceeding:
      return '진행중';
    default:
      return '전체';
  }
};

const useSearchFilter = (keyword: string, sorted: string, max: number, min: number, orderd: string) => {
  const [filterdStatus, setFilteredStatus] = useState<Status>();

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

  return { isLoading, isError, data, filterdStatus };
};

// const [goalState, setGoalState] = useState();

// useEffect(() => {
//   if (goalStatus === '모집중') {
//     const searchResultsRecruiting = searchResults?.filter(
//       (result) => result.createdAt <= new Date() && result.startDate >= new Date()
//     );
//     setFilterdResultsStatus([...searchResultsRecruiting]);
//   } else if (goalStatus === '진행중') {
//     const searchResultsInProgress = searchResults?.filter(
//       (result) => result.startDate <= new Date() && result.endDate >= new Date()
//     );
//     setFilterdResultsStatus([...searchResultsInProgress]);
//   } else {
//     setFilterdResultsStatus([...searchResults]);
//   }
// }, [goalStatus]);

// useEffect(() => {
//   const searchResultsAimingAmount = searchResults?.filter(
//     (result) => result.amount <= aimingAmount.max && result.amount >= aimingAmount.min
//   );
//   setFilterdResultsAmount([...searchResultsAimingAmount]);
// }, [aimingAmount]);

// useEffect(() => {
//   const searchResultsPeriod = searchResults?.filter(
//     (result) =>
//       dateCalculator(result.startDate, result.endDate) <= period.max &&
//       dateCalculator(result.startDate, result.endDate) >= period.min
//   );
//   setFilterdResultsPeriod([...searchResultsPeriod]);
// }, [period]);

// useEffect(() => {
//   const searchResultsHeadCount = searchResults.filter(
//     (result) => result.headCount <= headCount.max && result.headCount >= headCount.min
//   );
//   setFilterdResultsHeadCount([...searchResultsHeadCount]);
// }, [headCount]);

export default useSearchFilter;
