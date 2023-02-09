import { useState } from 'react';
import {
  StatusType,
  OrderType,
  SortType,
  ISearchFilter,
  StatusTypetoString,
  SortTypetoString,
  OrderTypetoString,
} from '../interfaces/interfaces';

const useSearchFilterState = ({ initVal }: { initVal: ISearchFilter }) => {
  const [filter, setFilter] = useState<ISearchFilter>(initVal);

  const handleFilterChange = (status: StatusType, sort: SortType, min: number, max: number) => {
    setFilter((prev) => {
      return {
        ...prev,
        status: StatusTypetoString(status),
        ordered: 'DESC',
        sorted: SortTypetoString(sort),
        min: min,
        max: max,
        cursor: 0,
        goalId: 0,
      };
    });
  };

  const handleKeywordChange = (keyword: string) => {
    setFilter((prev) => {
      return { ...prev, keyword };
    });
  };
  const handleStatusChange = (type: StatusType) => {
    setFilter((prev) => {
      return { ...prev, status: StatusTypetoString(type) };
    });
  };
  const handleSortChange = (type: SortType) => {
    setFilter((prev) => {
      return { ...prev, sorted: SortTypetoString(type) };
    });
  };
  const handleRangeChange = (min: number, max: number) => {
    setFilter((prev) => {
      return { ...prev, min, max };
    });
  };
  const handleOrderTypeChange = (type: OrderType) => {
    setFilter((prev) => {
      return { ...prev, ordered: OrderTypetoString(type) };
    });
  };

  return {
    filter,
    handleKeywordChange,
    handleFilterChange,
    handleStatusChange,
    handleSortChange,
    handleRangeChange,
    handleOrderTypeChange,
  };
};

export default useSearchFilterState;
