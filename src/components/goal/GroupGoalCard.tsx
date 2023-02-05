import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EmojiBox from '../common/elem/EmojiBox';
import StateTag from '../common/tag/StateTag';
import DdayTag from '../common/tag/DdayTag';

import { dateStringTranslator } from '../../utils/dateTranslator';

import { GoalStatus, GoalStatusStringtoType, ISearchGoal } from '../../interfaces/interfaces';

const GroupGoalCard = ({ goal }: { goal: ISearchGoal }) => {
  const navigate = useNavigate();
  const status = GoalStatusStringtoType(goal.status);

  return (
    <Wrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <TopContent>
        <HeadContent>
          <StateTag state={status} />
          <DdayTag targetDate={new Date(goal.endDate)} />
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
            {status !== GoalStatus.recruit
              ? `${dateStringTranslator(new Date(goal.endDate))} 자정 종료`
              : `${dateStringTranslator(new Date(goal.startDate))} 자정 시작`}
          </ProgressText>
          {status !== GoalStatus.proceeding ? (
            <></>
          ) : (
            <RecruitState>{`${goal.curCount}/${goal.headCount}`}</RecruitState>
          )}
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

export default GroupGoalCard;
