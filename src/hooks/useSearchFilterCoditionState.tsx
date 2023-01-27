import { useState } from 'react';

enum StatusType {
  total,
  recrut,
  proceeding,
}

interface IAmountFilter {
  min: number;
  max: number;
}

interface IPeriodFilter {
  min: number;
  max: number;
}

interface IPeriodFilter {
  min: number;
  max: number;
}

const useSearchFilterCoditionState = () => {
  const [statusFilter, setStatusFilter] = useState<StatusType>(StatusType.total);
  const handleStatusFilterType = (statusFilter: StatusType) => {
    setStatusFilter(statusFilter);
  };

  const StatusKR = (statusFilter: StatusType) => {
    switch (statusFilter) {
      case StatusType.recrut:
        return '모집중';
      case StatusType.proceeding:
        return '진행중';
      default:
        return '전체';
    }
  };

  const [amountFilter, setAmountFilter] = useState<IAmountFilter>({ min: 0, max: 0 });
  const handleAmountFilter = (min: number, max: number) => {
    setAmountFilter({ min, max });
  };

  const [periodFilter, setPeriodFilter] = useState<IPeriodFilter>({ min: 0, max: 0 });
  const handlePeriodFilter = (min: number, max: number) => {
    setPeriodFilter({ min, max });
  };

  const [memberFilter, setMemberFilter] = useState<IPeriodFilter>({ min: 0, max: 0 });
  const handleMemberFilter = (min: number, max: number) => {
    setMemberFilter({ min, max });
  };

  const [orderType, setOrderType] = useState<'ASC' | 'DESC'>('DESC');
  const handleOrderType = () => {
    setOrderType((prev) => {
      if (prev === 'ASC') return 'DESC';
      return 'ASC';
    });
  };

  return {
    statusFilter,
    amountFilter,
    periodFilter,
    memberFilter,
    orderType,
    StatusKR,
    handleStatusFilterType,
    handleAmountFilter,
    handlePeriodFilter,
    handleMemberFilter,
    handleOrderType,
  };
};

export default useSearchFilterCoditionState;
