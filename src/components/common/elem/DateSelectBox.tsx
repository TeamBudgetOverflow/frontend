import React from 'react';
import styled from 'styled-components';

interface DateSelectBoxProps {
  // date input box value should be 'YYYY-MM-DD' format
  value: string;
  min: string;
  max: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

function DateSelectBox({ value, min, max, onChange }: DateSelectBoxProps) {
  return <DateSelect type='date' value={value} min={min} max={max} onChange={onChange} />;
}

const DateSelect = styled.input`
  padding: 0 10px;
  width: calc(100% - 20px);
  height: 100%;
  font: ${(props) => props.theme.captionC2};
  border: 1px solid black;
`;

export default DateSelectBox;
