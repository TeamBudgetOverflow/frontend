import React from 'react';

import styled from 'styled-components';

const ImpendingGoalCards = () => {
  return (
    <CardWrapper>
      <ImageWrapper></ImageWrapper>
      <TextWrapper>
        <Title>Title</Title>
        <Hashtag>hashtage</Hashtag>
      </TextWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 120px;
  height: 144px;
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
`;

const Title = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;
const Hashtag = styled.span`
  font: ${(props) => props.theme.captionC2};
`;

export default ImpendingGoalCards;
