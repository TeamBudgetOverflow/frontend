import { useState } from 'react';
import { StatusType, OrderType, SortType, ISearchFilterTypes } from '../interfaces/interfaces';

const useSearchFilterState = () => {
  const [filter, setFilter] = useState<ISearchFilterTypes>({
    status: StatusType.total,
    sorted: SortType.none,
    min: 0,
    max: 0,
  });

  const handleFilterChange = (status: StatusType, sort: SortType, min: number, max: number) => {
    setFilter(() => {
      return { status, sorted: sort, min: min, max: max };
    });
  };
  const handleStatusChange = (type: StatusType) => {
    setFilter((prev) => {
      return { ...prev, status: type };
    });
  };
  const handleSortChange = (type: SortType) => {
    setFilter((prev) => {
      return { ...prev, sorted: type };
    });
  };
  const handleRangeChange = (min: number, max: number) => {
    setFilter((prev) => {
      return { ...prev, min, max };
    });
  };

  const [orderType, setOrderType] = useState<OrderType>(OrderType.desc);
  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType(type);
    setPage(1);
  };

  const [page, setPage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return {
    filter,
    orderType,
    page,
    handleFilterChange,
    handleStatusChange,
    handleSortChange,
    handleRangeChange,
    handleOrderTypeChange,
    handlePageChange,
  };
};

export default useSearchFilterState;
