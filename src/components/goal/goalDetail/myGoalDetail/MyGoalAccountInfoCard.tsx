import React from 'react';
import styled from 'styled-components';

// TODO: 계좌 정보 get 연결
// TODO: 디자인에 맞게 UI 변경
const MyGoalAccountInfoCard = () => {
  return (
    <Wrapper>
      <GoalAccountInfoCardWrapper>
        <SubTitleSpan>계좌</SubTitleSpan>
        <AccountInfoWrapper>우리은행 1002-645-123456</AccountInfoWrapper>
      </GoalAccountInfoCardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  height: 46px;
  border-radius: 16px;
  background-color: beige;
  display: flex;
  align-items: center;
`;

const GoalAccountInfoCardWrapper = styled.div`
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

const AccountInfoWrapper = styled.div`
  width: 85%;
  padding-top: 3px;
`;

export default MyGoalAccountInfoCard;
