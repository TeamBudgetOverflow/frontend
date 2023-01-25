import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import {
  filterConditionsAimingAmount,
  filterConditionsHeadCount,
  filterConditionsPeriod,
} from '../../../../recoil/searchAtoms';

import './rangeSlider.css';

interface RangeSliderProps {
  type: 'aimingAmount' | 'period' | 'headCount';
  min: number;
  max: number;
}

const RangeSlider: FC<RangeSliderProps> = ({ type, min, max }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const [amountMinVal, setAmountMinVal] = useState(min);
  const [amountMaxVal, setAmountMaxVal] = useState(max);

  const [periodMinVal, setPeriodMinVal] = useState(min);
  const [periodMaxVal, setPeriodMaxVal] = useState(max);

  const [headCountMinVal, setHeadCountMinVal] = useState(min);
  const [headCountMaxVal, setHeadCountMaxVal] = useState(max);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const handleOnChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);

    setMinVal(value);

    if (type === 'aimingAmount') {
      setAmountMinVal(value);
    }

    if (type === 'period') {
      setPeriodMinVal(value);
    }

    if (type === 'headCount') {
      setHeadCountMinVal(value);
    }

    minValRef.current = value;
  };

  const handleOnChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minVal + 1);

    setMaxVal(value);

    if (type === 'aimingAmount') {
      setAmountMaxVal(value);
    }

    if (type === 'period') {
      setPeriodMaxVal(value);
    }

    if (type === 'headCount') {
      setHeadCountMaxVal(value);
    }

    maxValRef.current = value;
  };

  const setFilterConditionAimingAmount = useSetRecoilState(filterConditionsAimingAmount);
  const setFilterConditionPeriod = useSetRecoilState(filterConditionsPeriod);
  const setFilterConditionHeadCount = useSetRecoilState(filterConditionsHeadCount);

  useEffect(() => {
    setFilterConditionAimingAmount({ aimingAmount: { min: amountMinVal, max: amountMaxVal } });
  }, [amountMinVal, amountMaxVal]);

  useEffect(() => {
    setFilterConditionPeriod({ period: { min: periodMinVal, max: periodMaxVal } });
  }, [periodMinVal, periodMaxVal]);

  useEffect(() => {
    setFilterConditionHeadCount({ headCount: { min: headCountMinVal, max: headCountMaxVal } });
  }, [headCountMinVal, headCountMaxVal]);

  return (
    <div className='container'>
      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        onChange={handleOnChangeMin}
        className='thumb thumb--left'
        // style={{ zIndex: minVal > max - 100 && '5' }}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        onChange={handleOnChangeMax}
        className='thumb thumb--right'
      />
      <div className='slider'>
        <div className='slider__track'></div>
        <div ref={range} className='slider__range'></div>
        <div className='slider__left-value'>{minVal}</div>
        <div className='slider__right-value'>{maxVal}</div>
      </div>
    </div>
  );
};

export default RangeSlider;
