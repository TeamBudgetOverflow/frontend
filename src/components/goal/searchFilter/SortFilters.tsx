import React, { useState, useEffect, forwardRef, Ref } from 'react';
import styled from 'styled-components';

import RangeSelectBox from './RangeSelectBox';

import { SortType } from '../../../interfaces/interfaces';

interface SortFiltersProps {
  initType: SortType;
  initMin: number;
  initMax: number;
  changeHandler: (sortType: SortType, min: number, max: number) => void;
}

const SortFilters = ({ initType, initMin, initMax, changeHandler }: SortFiltersProps, ref: Ref<HTMLDivElement>) => {
  useEffect(() => {
    setType(initType);
  }, [initType]);

  const [type, setType] = useState<SortType>(initType);
  const handleTypeChange = (selected: SortType) => {
    if (type === selected) {
      setType(SortType.none);
      return;
    }
    setType(selected);
  };

  const [amountMin, setAmountMin] = useState<number>(initMin);
  const handleAmountMinChange = (min: number) => {
    setAmountMin(min);
  };
  const [amountMax, setAmountMax] = useState<number>(initMax);
  const handleAmountMaxChange = (max: number) => {
    setAmountMax(max);
  };

  const [periodMin, setPeriodMin] = useState<number>(initMin);
  const handlePeriodMinChange = (min: number) => {
    setPeriodMin(min);
  };
  const [periodMax, setPeriodMax] = useState<number>(initMax);
  const handlePeriodMaxChange = (max: number) => {
    setPeriodMax(max);
  };

  const [headCountMin, setHeadCountMin] = useState<number>(initMin);
  const handleHeadCountMinChange = (min: number) => {
    setHeadCountMin(min);
  };
  const [headCountMax, setHeadCountMax] = useState<number>(initMax);
  const handleHeadCountMaxChange = (max: number) => {
    setHeadCountMax(max);
  };

  useEffect(() => {
    changeHandler(type, amountMin, amountMax);
  }, [type, amountMin, amountMax]);

  useEffect(() => {
    changeHandler(type, periodMin, periodMax);
  }, [periodMin, periodMax]);

  useEffect(() => {
    changeHandler(type, headCountMin, headCountMax);
  }, [headCountMin, headCountMax]);

  return (
    <Wrapper>
      <ContentWrapper>
        <SubTitle ref={ref}>
          <input
            type='radio'
            value={SortType.amount}
            checked={type === SortType.amount}
            onClick={() => handleTypeChange(SortType.amount)}
            onChange={() => handleTypeChange(SortType.amount)}
          />
          목표금액
        </SubTitle>
        <RangeSelectBox
          min={1000}
          max={70000}
          gap={1000}
          unit='원'
          minChangeHandler={handleAmountMinChange}
          maxChangeHandler={handleAmountMaxChange}
          isDisabled={type !== SortType.amount}
        />
      </ContentWrapper>
      <ContentWrapper>
        <SubTitle>
          <input
            type='radio'
            value={SortType.period}
            checked={type === SortType.period}
            onClick={() => handleTypeChange(SortType.period)}
            onChange={() => handleTypeChange(SortType.period)}
          />
          진행기간
        </SubTitle>
        <RangeSelectBox
          min={3}
          max={7}
          gap={1}
          unit='일'
          minChangeHandler={handlePeriodMinChange}
          maxChangeHandler={handlePeriodMaxChange}
          isDisabled={type !== SortType.period}
        />
      </ContentWrapper>
      <ContentWrapper>
        <SubTitle>
          <input
            type='radio'
            value={SortType.member}
            checked={type === SortType.member}
            onClick={() => handleTypeChange(SortType.member)}
            onChange={() => handleTypeChange(SortType.member)}
          />
          모집인원
        </SubTitle>
        <RangeSelectBox
          min={2}
          max={100}
          gap={1}
          unit='명'
          minChangeHandler={handleHeadCountMinChange}
          maxChangeHandler={handleHeadCountMaxChange}
          isDisabled={type !== SortType.member}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const SubTitle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: start;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

export default forwardRef(SortFilters);
