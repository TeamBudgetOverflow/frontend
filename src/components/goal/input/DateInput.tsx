import React, { useEffect } from 'react';
import styled from 'styled-components';

import DateSelectBox from '../../common/elem/DateSelectBox';

import useDateInput from '../../../hooks/useDateInput';

import { dateStringTranslatorWithPoint } from '../../../utils/dateTranslator';

interface DateInputProps {
  title: string;
  startDate: Date;
  initVal: string;
  min: number;
  max: number;
  isDisabled: boolean;
  changeHandler: (val: Date) => void;
}
const DateInput = ({ title, startDate, initVal, min, max, isDisabled, changeHandler }: DateInputProps) => {
  const { minDate, maxDate, start, value, onChangeStartDate, onChangeEndDate } = useDateInput({
    startDate,
    initVal,
    minDays: min,
    maxDays: max,
  });

  useEffect(() => {
    onChangeStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    changeHandler(new Date(value));
  }, [value]);

  return (
    <Wrapper disabled={isDisabled}>
      <SubTitle>{title}</SubTitle>
      <RowContent>
        <DateText>{dateStringTranslatorWithPoint(start)}</DateText>
        <span>-</span>
        {isDisabled ? (
          <DateText>{dateStringTranslatorWithPoint(new Date(value))}</DateText>
        ) : (
          <InputWrapper>
            <DateSelectBox value={value} min={minDate} max={maxDate} onChange={onChangeEndDate} />
          </InputWrapper>
        )}
      </RowContent>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ disabled: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const DateText = styled.div`
  font: ${(props) => props.theme.paragraphP2};
`;

const InputWrapper = styled.div`
  height: 30px;
`;

export default DateInput;
