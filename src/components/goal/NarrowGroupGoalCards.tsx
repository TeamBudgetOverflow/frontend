import React from 'react';

import styled from 'styled-components';
import { IUserGoal } from '../../interfaces/interfaces';

const NarrowGroupGoalCards = ({ goal }: { goal: IUserGoal }) => {
  return (
    <CardWrapper>
      <ImageWrapper></ImageWrapper>
      <TextWrapper>
        <Title>{goal.title}</Title>
        <Hashtag>{goal.hashtag}</Hashtag>
      </TextWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  flex: 0 0 auto;
  min-width: 120px;
  width: 30%;
  max-height: 160px;
  height: 100%;
  padding: 8px;
  margin: 4px;
  border: 1px solid;
  border-radius: 16px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Title = styled.p`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Hashtag = styled.span`
  font: ${(props) => props.theme.captionC2};
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 120px;
  height: 20px;
`;

export default NarrowGroupGoalCards;
