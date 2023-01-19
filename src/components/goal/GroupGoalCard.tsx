import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StateTag from '../common/tag/StateTag';
import DdayTag from '../common/tag/DdayTag';

import { dDayCalculator } from '../../utils/dDayCalculator';
import { dateStringTranslator } from '../../utils/dateTranslator';

import { IGoal } from '../../interfaces/interfaces';

const StateGoalCard = ({ goal }: { goal: IGoal }) => {
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
        <TopLeftContent>
          <StateTag state={state} />
          <Content>
            <IconWrapper>
              <Icon />
            </IconWrapper>
            <TextContent>
              <Title>{goal.title}</Title>
              <Amount>{`${goal.amount.toLocaleString()}원`}</Amount>
            </TextContent>
          </Content>
        </TopLeftContent>
        <TopRightContent>
          <DdayTag dDay={dDayCalculator(goal.endDate)} />
        </TopRightContent>
      </TopContent>
      <BottomContent>
        {state === 'working' ? (
          <ProgressBarWrapper>
            <ProgressBar width={`${goal.attainment}%`} />
          </ProgressBarWrapper>
        ) : (
          <></>
        )}
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

const IconWrapper = styled.div`
  padding: 5px 0;
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

const RecruitState = styled.div`
  font: ${(props) => props.theme.captionC3};
`;

export default StateGoalCard;
