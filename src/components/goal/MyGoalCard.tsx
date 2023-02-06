import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EmojiBox from '../common/elem/EmojiBox';
import C2TextBox from '../common/elem/C2TextBox';
import DdayTag from '../common/tag/DdayTag';
import StateTag from '../common/tag/StateTag';
import ProgressBar from '../common/elem/ProgressBar';

import { GoalStatus, GoalStatusStringtoType, IGoal } from '../../interfaces/interfaces';

import { setProgressState } from '../../utils/progressState';
import { dateStringTranslator } from '../../utils/dateTranslator';

const MyGoalCard = ({ goal }: { goal: IGoal }) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <TopContent>
        <TopLeftContent>
          <StateTag state={GoalStatusStringtoType(goal.status)} />
          <Content>
            <EmojiBox unicode={goal.emoji} boxSize={40} emojiSize={20} />
            <TextContent>
              <Title>{goal.title}</Title>
              <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
            </TextContent>
          </Content>
        </TopLeftContent>
        <TopRightContent>
          <DdayTag targetDate={new Date(goal.endDate)} />
        </TopRightContent>
      </TopContent>
      <BottomContent>
        {GoalStatusStringtoType(goal.status) !== GoalStatus.recruit ? (
          <>
            <ProgressBar percentage={goal.attainment} height={8} borderRadius={25} />
            <ProgressInfo>
              <C2TextBox text={setProgressState(goal.attainment)} />
              <C2TextBox text={`${Math.round(goal.attainment)}%`} />
            </ProgressInfo>
          </>
        ) : (
          <>
            <C2TextBox text={`${dateStringTranslator(new Date(goal.startDate))} 자정 시작`} />
          </>
        )}
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

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default MyGoalCard;
