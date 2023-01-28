import { useState } from 'react';
import { ISearchFilterOrderType, ISearchFilterSortType, ISearchFilterStatusType } from '../interfaces/interfaces';

const useSearchFilterState = () => {
  const [filterSorted, setFilterSorted] = useState<ISearchFilterSortType>({ sortby: null });
  const handleFilterSortedChange = (sorted: ISearchFilterSortType) => {
    setFilterSorted(sorted);
  };

  const [filterOrdered, setFilterOrdered] = useState<ISearchFilterOrderType>({ orderby: 'DESC' });
  const handleFilterOrderedChange = (ordered: ISearchFilterOrderType) => {
    setFilterOrdered(ordered);
  };

  const [filterStatus, setFilterStatus] = useState<ISearchFilterStatusType>({ status: 'total' });
  const handleFilterStatusChange = (filterStatus: ISearchFilterStatusType) => {
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
    filterRangeMin,
    filterRangeMax,
    filterStatus,
    pageNumber,
    handleFilterSortedChange,
    handleFilterOrderedChange,
    handleFilterStatusChange,
    handleRangeMinChange,
    handleRangeMaxChange,
    handlePageNumberChange,
  };
};

export default useSearchFilterState;
