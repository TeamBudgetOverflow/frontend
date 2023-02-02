import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dDayCalculator } from '../../../utils/dDayCalculator';

const DdayTag = ({ targetDate }: { targetDate: Date }) => {
  const [days, setDays] = useState<number>(0);
  useEffect(() => {
    setDays(dDayCalculator(targetDate));
  }, [targetDate]);

  if (days < 0) return <></>;

  return <Tag>{`D-${days === 0 ? 'day' : days}`}</Tag>;
};

const Tag = styled.div`
  padding: 4px 12px;
  font: ${(props) => props.theme.captionC2};
  border-radius: 15px;
  color: white;
  background-color: ${(props) => props.theme.primary400};
`;

export default DdayTag;
