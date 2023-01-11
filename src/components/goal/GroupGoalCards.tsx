import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { IUserGoal } from '../../interfaces/interfaces';

import { dDayCalculator } from '../../utils/dDayCalculator';
import { dateStringTranslator } from '../../utils/dateTranslator';

const GroupGoalCards = ({ goal }: { goal: IUserGoal }) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(`/goal/${goal.id}`)}>
      <TopContent>
        <TopLeftContent>
          <Icon />
          <TextContent>
            <Title>{goal.title}</Title>
            <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
          </TextContent>
        </TopLeftContent>
        <DdayTag>{`D-${dDayCalculator(goal.endDate)}`}</DdayTag>
      </TopContent>
      <BottomContent>
        <ProgressBarWrapper>
          <ProgressBar width={`${goal.attainment}%`} />
        </ProgressBarWrapper>
        <LowerLine>
          <ProgressText>{`${dateStringTranslator(
            goal.endDate
          )} 종료`}</ProgressText>
          <ProgressText>{`${goal.attainment}%`}</ProgressText>
        </LowerLine>
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 18px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.primary200};
  :hover {
    cursor: pointer;
  }
`;

const TopContent = styled.div`
  ::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const TopLeftContent = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.primary50};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.div`
  font: ${(props) => props.theme.paragraphsP3R};
`;

const Amount = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

const DdayTag = styled.div`
  float: right;
  padding: 12px;
  border-radius: 15px;
  font: ${(props) => props.theme.captionC3};
  background-color: ${(props) => props.theme.primary50};
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.primary50};
`;

const ProgressBar = styled.div<{ width: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width};
  height: 8px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.primary900};
`;

const ProgressText = styled.div`
  font: ${(props) => props.theme.captionC3};
`;

const LowerLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default GroupGoalCards;
