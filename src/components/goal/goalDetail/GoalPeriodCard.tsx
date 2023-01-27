import React from 'react';
import styled from 'styled-components';

import DdayTag from '../../common/tag/DdayTag';

import { dateStringTranslator } from '../../../utils/dateTranslator';

interface GoalPeriodCard {
  startDate: Date;
  endDate: Date;
}

const GoalPeriodCard = ({ startDate, endDate }: GoalPeriodCard) => {
  return (
    <Wrapper>
      <GoalPeriodCardWrapper>
        <SubTitle>기간</SubTitle>
        <Period>{`${dateStringTranslator(new Date(startDate))} - ${dateStringTranslator(new Date(endDate))}`}</Period>
      </GoalPeriodCardWrapper>
      <DdayTag targetDate={new Date(endDate)} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: calc(100% - 40px);
  border-radius: 16px;
  background-color: white;
`;

const GoalPeriodCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const Period = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;
export default GoalPeriodCard;
