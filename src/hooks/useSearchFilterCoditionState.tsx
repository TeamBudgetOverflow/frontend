import { useState } from 'react';
import { ISearchFilterOrdered, ISearchFilterSorted, ISearchFilterStatus } from '../interfaces/interfaces';

const useSearchFilterCoditionState = () => {
  const [filterSorted, setFilterSorted] = useState<ISearchFilterSorted>({ sorted: null });
  const handleFilterSortedChange = (sorted: ISearchFilterSorted) => {
    setFilterSorted(sorted);
  };

  const [filterOrdered, setFilterOrdered] = useState<ISearchFilterOrdered>({ ordered: 'DESC' });
  const handleFilterOrderedChange = (ordered: ISearchFilterOrdered) => {
    setFilterOrdered(ordered);
  };

  const [filterStatus, setFilterStatus] = useState<ISearchFilterStatus>({ status: 'total' });
  const handleFilterStatusChange = (filterStatus: ISearchFilterStatus) => {
    setFilterStatus(filterStatus);
  };

  const [filterRangeMin, setFilterRangeMin] = useState<number>(0);
  const handleRangeMinChange = (min: number) => {
    setFilterRangeMin(min);
  };

  const [filterRangeMax, setFilterRangeMax] = useState<number>(0);
  const handleRangeMaxChange = (max: number) => {
    setFilterRangeMax(max);
  };

  const [pageNumber, setPageNumber] = useState<number>(1);
  const handlePageNumberChange = (page: number) => {
    setPageNumber(page);
  };

  return {
    filterSorted,
    filterOrdered,
    filterStatus,
    pageNumber,
    filterRangeMax,
    filterRangeMin,
    handleFilterSortedChange,
    handleFilterOrderedChange,
    handleFilterStatusChange,
    handleRangeMinChange,
    handleRangeMaxChange,
    handlePageNumberChange,
  };
};

export default useSearchFilterCoditionState;
