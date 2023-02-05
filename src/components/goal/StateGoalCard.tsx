import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EmojiBox from '../common/elem/EmojiBox';
import StateTag from '../common/tag/StateTag';
import DdayTag from '../common/tag/DdayTag';

import { dateStringTranslator } from '../../utils/dateTranslator';

import { GoalStatus, GoalStatusStringtoType, IGoal } from '../../interfaces/interfaces';

import ProgressBar from '../common/elem/ProgressBar';

const StateGoalCard = ({ goal }: { goal: IGoal }) => {
  const navigate = useNavigate();
  const status = GoalStatusStringtoType(goal.status);

  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <TopContent>
        <TopLeftContent>
          <StateTag state={status} />
          <Content>
            <EmojiBox unicode={goal.emoji} boxSize={40} emojiSize={20} />
            <TextContent>
              <Title>{goal.title}</Title>
              <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
            </TextContent>
          </Content>
        </TopLeftContent>
        <TopRightContent>
          {status !== GoalStatus.done ? <DdayTag targetDate={new Date(goal.endDate)} /> : <></>}
        </TopRightContent>
      </TopContent>
      <BottomContent>
        {status !== GoalStatus.recruit ? (
          <ProgressBar percentage={goal.attainment} height={8} borderRadius={25} />
        ) : (
          <></>
        )}
        <ProgressInfo>
          <ProgressText>
            {status !== GoalStatus.recruit
              ? `${dateStringTranslator(new Date(goal.endDate))} 자정 종료`
              : `${dateStringTranslator(new Date(goal.startDate))} 자정 시작`}
          </ProgressText>
          {status !== GoalStatus.recruit ? <ProgressText>{`${Math.round(goal.attainment)}%`}</ProgressText> : <></>}
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

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressText = styled.div`
  font: ${(props) => props.theme.captionC2};
`;

export default StateGoalCard;
