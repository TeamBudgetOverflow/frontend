import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

function useSearchFilter() {
  const [goalState, setGoalState] = useState();

  useEffect(() => {
    if (goalStatus === '모집중') {
      const searchResultsRecruiting = searchResults?.filter(
        (result) => result.createdAt <= new Date() && result.startDate >= new Date()
      );
      setFilterdResultsStatus([...searchResultsRecruiting]);
    } else if (goalStatus === '진행중') {
      const searchResultsInProgress = searchResults?.filter(
        (result) => result.startDate <= new Date() && result.endDate >= new Date()
      );
      setFilterdResultsStatus([...searchResultsInProgress]);
    } else {
      setFilterdResultsStatus([...searchResults]);
    }
  }, [goalStatus]);

  useEffect(() => {
    const searchResultsAimingAmount = searchResults?.filter(
      (result) => result.amount <= aimingAmount.max && result.amount >= aimingAmount.min
    );
    setFilterdResultsAmount([...searchResultsAimingAmount]);
  }, [aimingAmount]);

  useEffect(() => {
    const searchResultsPeriod = searchResults?.filter(
      (result) =>
        dateCalculator(result.startDate, result.endDate) <= period.max &&
        dateCalculator(result.startDate, result.endDate) >= period.min
    );
    setFilterdResultsPeriod([...searchResultsPeriod]);
  }, [period]);

  useEffect(() => {
    const searchResultsHeadCount = searchResults.filter(
      (result) => result.headCount <= headCount.max && result.headCount >= headCount.min
    );
    setFilterdResultsHeadCount([...searchResultsHeadCount]);
  }, [headCount]);
  return;
}

export default useSearchFilter;
