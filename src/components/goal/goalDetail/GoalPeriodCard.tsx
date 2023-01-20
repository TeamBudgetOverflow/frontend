import React from 'react';
import styled from 'styled-components';

import DdayTag from '../../common/tag/DdayTag';

import { dateStringTranslator } from '../../../utils/dateTranslator';
import { dDayCalculator } from '../../../utils/dDayCalculator';

interface GoalPeriodCard {
  startDate: Date;
  endDate: Date;
}

const GoalPeriodCard = ({ startDate, endDate }: GoalPeriodCard) => {
  return (
    <Wrapper>
      <GoalPeriodCardWrapper>
        <SubTitleSpan>기간</SubTitleSpan>
        <PeriodWrapper>{`${dateStringTranslator(new Date(startDate))} - ${dateStringTranslator(
          new Date(endDate)
        )}`}</PeriodWrapper>
        <DdayTag dDay={dDayCalculator(new Date(endDate))} />
      </GoalPeriodCardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  height: 46px;
  border-radius: 16px;
  background-color: beige;
  display: flex;
`;

const GoalPeriodCardWrapper = styled.div`
  width: 100%;
  height: 70%;
  margin: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SubTitleSpan = styled.div`
  width: 15%;
  font: ${(props) => props.theme.captionC1};
`;

const PeriodWrapper = styled.div`
  width: 70%;
  padding-top: 3px;
`;
export default GoalPeriodCard;
