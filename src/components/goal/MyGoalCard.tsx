import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IGoal } from '../../interfaces/interfaces';
import { dDayCalculator } from '../../utils/dDayCalculator';

import { setProgressState } from '../../utils/progressState';

const MyGoalCard = ({ goal }: { goal: IGoal }) => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.id}`)}>
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
        <ProgressInfo>
          <ProgressText>{setProgressState(goal.attainment)}</ProgressText>
          <ProgressText>{`${goal.attainment}%`}</ProgressText>
        </ProgressInfo>
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
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

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressText = styled.div`
  font: ${(props) => props.theme.captionC3};
`;

export default MyGoalCard;
