import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EmojiBox from '../common/elem/EmojiBox';

import { ISearchGoal } from '../../interfaces/interfaces';

const GroupGoalCardSmall = ({ goal }: { goal: ISearchGoal }) => {
  const navigate = useNavigate();
  return (
    <CardWrapper onClick={() => navigate(`/goals/${goal.goalId}`)}>
      <EmojiBox unicode={goal.emoji} boxSize={72} emojiSize={72} showBg={false} />
      <TextWrapper>
        <Title>{goal.title.length > 7 ? `${goal.title.slice(0, 7)}...` : goal.title}</Title>
        <TagList>
          {goal.hashTag.slice(0, 2).map((tag) => {
            if (tag.length === 0) {
              return <React.Fragment key={tag}></React.Fragment>;
            }
            return <Tag key={tag}>{`#${tag.length > 3 ? `${tag.slice(0, 3)}...` : tag}`}</Tag>;
          })}
        </TagList>
      </TextWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  max-width: 120px;
  max-height: 160px;
  width: 30%;
  border-radius: 16px;
  background-color: white;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;

const Title = styled.p`
  width: 100%;
  font: ${(props) => props.theme.paragraphsP3M};
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Tag = styled.span`
  word-break: keep-all;
  white-space: nowrap;
  font: ${(props) => props.theme.paragraphsP3R};
  color: ${(props) => props.theme.primaryMain};
`;

export default GroupGoalCardSmall;
