import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EmojiBox from '../common/elem/EmojiBox';
import DdayTag from '../common/tag/DdayTag';

import { IGoal } from '../../interfaces/interfaces';

import { dDayCalculator } from '../../utils/dDayCalculator';
import { setProgressState } from '../../utils/progressState';
import C3TextBox from '../common/elem/C3TextBox';

const MyGoalCard = ({ goal }: { goal: IGoal }) => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <TopContent>
        <TopLeftContent>
          <EmojiBox unicode={goal.emoji} boxSize={40} emojiSize={20} />
          <TextContent>
            <Title>{goal.title}</Title>
            <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
          </TextContent>
        </TopLeftContent>
        <TopRightContent>
          <DdayTag dDay={dDayCalculator(goal.endDate)} />
        </TopRightContent>
      </TopContent>
      <BottomContent>
        <ProgressBarWrapper>
          <ProgressBar width={`${goal.attainment}%`} />
        </ProgressBarWrapper>
        <ProgressInfo>
          <C3TextBox text={setProgressState(goal.attainment)} />
          <C3TextBox text={`${goal.attainment}%`} />
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
  background-color: white;
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

const TopRightContent = styled.div`
  float: right;
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
  background-color: ${(props) => props.theme.primary500};
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default MyGoalCard;
