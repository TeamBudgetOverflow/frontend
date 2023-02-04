import { useState, useEffect } from 'react';

interface useRangeBarProps {
  min: number;
  max: number;
}

const useRangeBar = ({ min, max }: useRangeBarProps) => {
  const [fixedMin] = useState<number>(min);
  const [fixedMax] = useState<number>(max);
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const [minPercent, setMinPercent] = useState<number>(0);
  const [maxPercent, setMaxPercent] = useState<number>(0);

  const setMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= maxVal) return;
    setMinVal(Number(e.target.value));
  };

  const setMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= minVal) return;
    setMaxVal(Number(e.target.value));
  };

  const handleRageChange = () => {
    setMinPercent(Math.trunc(((minVal - fixedMin) / (fixedMax - fixedMin)) * 100));
    setMaxPercent(Math.trunc(((maxVal - minVal) / (fixedMax - fixedMin)) * 100));
  };

  useEffect(() => {
    handleRageChange();
  }, [minVal, maxVal]);

  const reset = () => {
    setMinVal(fixedMin);
    setMaxVal(fixedMax);
  };

  return { minVal, maxVal, minPercent, maxPercent, setMin, setMax, reset };
};

export default useRangeBar;
