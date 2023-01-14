import React from 'react';
import styled from 'styled-components';

type GoalDescCard = {
  description: string;
};

const GoalDescCard = ({ description }: GoalDescCard) => {
  return (
    <Wrapper>
      <GoalDescCardWrapper>
        <SubTitleSpan>목표</SubTitleSpan>
        <DescWrapper>{description}</DescWrapper>
      </GoalDescCardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  height: 46px;
  border-radius: 16px;
  background: #f7f7f7;
  display: flex;
`;

const GoalDescCardWrapper = styled.div`
  width: 100%;
  height: 70%;
  margin: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SubTitleSpan = styled.div`
  width: 15%;
  font: ${(props) => props.theme.captionC1};
`;

const DescWrapper = styled.div`
  width: 85%;
  padding-top: 3px;
`;

export default GoalDescCard;
