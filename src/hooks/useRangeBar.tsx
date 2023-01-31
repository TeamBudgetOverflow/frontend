import { useState, useEffect } from 'react';

interface useRangeBarProps {
  minVal: number;
  maxVal: number;
  gapVal: number;
  barWidth: number;
}

const useRangeBar = ({ minVal, maxVal, gapVal, barWidth }: useRangeBarProps) => {
  const [steps, setSteps] = useState<number>(0);
  useEffect(() => {
    setSteps(Math.trunc((maxVal - minVal) / gapVal));
  }, [maxVal, minVal, gapVal]);
  const [gap, setGap] = useState<number>(0);
  useEffect(() => {
    setGap(barWidth / steps);
  }, [barWidth, steps]);
  const [minStep, setMinStep] = useState<number>(0);
  const [maxStep, setMaxStep] = useState<number>(0);
  useEffect(() => {
    setMaxStep(steps);
  }, [steps]);

  const handleMinMove = (clientX: number) => {
    setMinStep((prev) => {
      if (prev * gap > clientX) {
        if (prev - 1 < 0) return 0;
        return prev - 1;
      }
      if (prev * gap < clientX) {
        if (prev + 1 == maxStep) return prev;
        return prev + 1;
      }

      return prev;
    });
  };

  const handleMaxMove = (clientX: number) => {
    setMaxStep((prev) => {
      if (prev * gap > Math.trunc(clientX)) {
        if (prev - 1 == minStep) {
          return prev;
        }
        return prev - 1;
      }
      if (prev * gap < Math.trunc(clientX)) {
        if (prev + 1 > steps) {
          return prev;
        }
        return prev + 1;
      }

      return prev;
    });
  };

  const reset = () => {
    setMinStep(0);
    setMaxStep(steps);
  };

  return { minStep, maxStep, steps, handleMinMove, handleMaxMove, reset };
};

export default useRangeBar;
