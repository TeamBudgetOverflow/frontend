import React, { useEffect, useState } from 'react';
import { dateISOStringDateTranslator } from '../utils/dateTranslator';
interface useDateInputProps {
  startDate: Date;
  minDays: number;
  maxDays: number;
}

const useDateInput = ({ startDate, minDays, maxDays }: useDateInputProps) => {
  const getFutureDate = (startDate: Date, afterDays: number) => {
    const funtureDate = new Date().setDate(startDate.getDate() + afterDays);
    return dateISOStringDateTranslator(new Date(funtureDate));
  };

  const [start, setStart] = useState<Date>(startDate);
  const [minDate, setMinDate] = useState<string>(getFutureDate(startDate, minDays));
  const [maxDate, setMaxDate] = useState<string>(getFutureDate(startDate, maxDays));
  const [value, setValue] = useState<string>(minDate);

  const onChangeStartDate = (date: Date) => {
    setStart(date);
  };

  const onChangeEndDate = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    setMinDate(getFutureDate(start, minDays));
    setMaxDate(getFutureDate(start, maxDays));
  }, [start]);

  useEffect(() => {
    setValue(minDate);
  }, [minDate]);

  return { minDate, maxDate, start, value, onChangeStartDate, onChangeEndDate };
};

export default useDateInput;
