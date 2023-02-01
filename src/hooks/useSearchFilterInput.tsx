import { useState } from 'react';

import { StatusType, SortType } from '../interfaces/interfaces';

interface useSearchFilterInputProps {
  initStatus: StatusType;
  initSort: SortType;
  initMin: number;
  initMax: number;
}

const useSearchFilterInput = ({ initStatus, initSort, initMin, initMax }: useSearchFilterInputProps) => {
  const [status, setStatus] = useState<StatusType>(initStatus);
  const handleStatusChange = (type: StatusType) => {
    setStatus(type);
  };
  const [sort, setSort] = useState<SortType>(initSort);
  const handleSortChange = (type: SortType) => {
    setSort(type);
  };
  const [min, setMin] = useState<number>(initMin);
  const handleMinChange = (min: number) => {
    setMin(min);
  };
  const [max, setMax] = useState<number>(initMax);
  const handleMaxChange = (max: number) => {
    setMax(max);
  };
  const handleInitialize = (min: number, max: number) => {
    setMin(min);
    setMax(max);
  };

  return {
    status,
    sort,
    min,
    max,
    handleStatusChange,
    handleSortChange,
    handleMinChange,
    handleMaxChange,
    handleInitialize,
  };
};

export default useSearchFilterInput;
