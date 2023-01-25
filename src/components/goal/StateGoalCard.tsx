import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EmojiBox from '../common/elem/EmojiBox';
import StateTag from '../common/tag/StateTag';
import DdayTag from '../common/tag/DdayTag';

import { dateStringTranslator } from '../../utils/dateTranslator';

import { IGoal } from '../../interfaces/interfaces';

import useGoalState, { GoalState } from '../../hooks/useGoalState';

const StateGoalCard = ({ goal }: { goal: IGoal }) => {
  const navigate = useNavigate();
  const { state } = useGoalState({ startDate: new Date(goal.startDate), endDate: new Date(goal.endDate) });

  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <TopContent>
        <TopLeftContent>
          <StateTag state={state} />
          <Content>
            <EmojiBox unicode={goal.emoji} boxSize={40} emojiSize={20} />
            <TextContent>
              <Title>{goal.title}</Title>
              <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
            </TextContent>
          </Content>
        </TopLeftContent>
        <TopRightContent>
          {state !== GoalState.done ? <DdayTag targetDate={new Date(goal.endDate)} /> : <></>}
        </TopRightContent>
      </TopContent>
      <BottomContent>
        {state !== GoalState.waiting ? (
          <ProgressBarWrapper>
            <ProgressBar width={`${goal.attainment}%`} />
          </ProgressBarWrapper>
        ) : (
          <></>
        )}
        <ProgressInfo>
          <ProgressText>
            {state !== GoalState.waiting
              ? `${dateStringTranslator(new Date(goal.endDate))} 자정 종료`
              : `${dateStringTranslator(new Date(goal.startDate))} 자정 시작`}
          </ProgressText>
          {state !== GoalState.waiting ? <ProgressText>{`${goal.attainment}%`}</ProgressText> : <></>}
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
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

export default StateGoalCard;
