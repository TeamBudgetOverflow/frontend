import { useState } from 'react';

interface useRangeInputProps {
  minInitVal: number;
  maxInitVal: number;
}

const useRangeInput = ({ minInitVal, maxInitVal }: useRangeInputProps) => {
  const [min, setMin] = useState<number>(minInitVal);
  const handleMinChange = (min: number) => {
    setMin(min);
  };
  const [max, setMax] = useState<number>(maxInitVal);
  const handleMaxChange = (max: number) => {
    setMax(max);
  };
  const handleInitialize = () => {
    setMin(minInitVal);
    setMax(maxInitVal);
  };

  return {
    min,
    max,
    handleMinChange,
    handleMaxChange,
    handleInitialize,
  };
};

export default useRangeInput;
