import React from 'react';
import styled from 'styled-components';

interface GoalDescCardProps {
  description: string;
}

const GoalDescCard = ({ description }: GoalDescCardProps) => {
  return (
    <Wrapper>
      <SubTitle>목표</SubTitle>
      <Description>{description}</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  width: calc(100% - 40px);
  border-radius: 16px;
  background-color: white;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const Description = styled.div`
  font: ${(props) => props.theme.paragraphsP3R};
`;

export default GoalDescCard;
