import React, { useEffect, useState } from 'react';
import { dateISOStringDateTranslator } from '../utils/dateTranslator';
interface useDateInputProps {
  startDate: Date;
  minDays: number;
  maxDays: number;
}

const useDateInput = ({ startDate, minDays, maxDays }: useDateInputProps) => {
  const getFutureDate = (afterDays: number) => {
    const funtureDate = new Date().setDate(startDate.getDate() + afterDays);
    return dateISOStringDateTranslator(new Date(funtureDate));
  };

  const [minDate, setMinDate] = useState<string>(getFutureDate(minDays));
  const [maxDate, setMaxDate] = useState<string>(getFutureDate(maxDays));
  const [value, setValue] = useState<string>(minDate);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('selected time', e.currentTarget.value);
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (new Date().getHours() === 0) {
      setMinDate(getFutureDate(minDays));
      setMaxDate(getFutureDate(maxDays));
      setValue(minDate);
    }
  }, [new Date().getHours()]);

  return { minDate, maxDate, value, onChange };
};

export default useDateInput;
