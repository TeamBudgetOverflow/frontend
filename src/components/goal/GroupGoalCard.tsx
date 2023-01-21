import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StateTag from '../common/tag/StateTag';
import DdayTag from '../common/tag/DdayTag';

import { dDayCalculator } from '../../utils/dDayCalculator';
import { dateStringTranslator } from '../../utils/dateTranslator';

import { ISearchGoal } from '../../interfaces/interfaces';
import EmojiBox from '../common/elem/EmojiBox';

const GroupGoalCards = ({ goal }: { goal: ISearchGoal }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<'working' | 'recruiting'>('working');
  const setGoalState = () => {
    if (new Date(goal.startDate).getTime() <= new Date().getTime()) {
      setState('working');
      return;
    }

    setState('recruiting');
  };

  useEffect(() => {
    setGoalState();
  }, [goal]);

  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <TopContent>
        <HeadContent>
          <StateTag state={state} />
          <DdayTag dDay={dDayCalculator(new Date(goal.endDate))} />
        </HeadContent>
        <BodyContent>
          <Content>
            <EmojiBox unicode={goal.emoji} boxSize={40} emojiSize={20} />
            <TextContent>
              <Title>{goal.title}</Title>
              <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
            </TextContent>
          </Content>
        </BodyContent>
      </TopContent>
      <BottomContent>
        <ProgressInfo>
          <ProgressText>
            {state === 'working'
              ? `${dateStringTranslator(new Date(goal.endDate))} 자정 종료`
              : `${dateStringTranslator(new Date(goal.startDate))} 자정 시작`}
          </ProgressText>
          {state === 'working' ? <></> : <RecruitState>{`${goal.curCount}/${goal.headCount}`}</RecruitState>}
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
  border: 1px solid ${(props) => props.theme.gray300};
  :hover {
    cursor: pointer;
  }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeadContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const BodyContent = styled.div`
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

const RecruitState = styled.div`
  font: ${(props) => props.theme.captionC2};
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressText = styled(RecruitState)``;

export default GroupGoalCards;
