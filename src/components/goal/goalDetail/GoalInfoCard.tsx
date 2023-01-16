import React from 'react';
import styled from 'styled-components';

import { dateStringTranslator } from '../../../utils/dateTranslator';

interface GoalInfoCardProps {
  title: string;
  startDate: Date;
  recruitCount: number;
  headCount: number;
  amount: number;
}

// TODO: 목표 대표 이미지 get
const GoalInfoCard = ({ title, startDate, headCount, recruitCount, amount }: GoalInfoCardProps) => {
  return (
    <GoalInfoCardWrapper>
      <UpperWrapper>
        <ImgBox>img</ImgBox>
        <TitleSpan>{title}</TitleSpan>
      </UpperWrapper>
      <Amount>{amount.toLocaleString()} 원</Amount>
      <StartDate>{`${dateStringTranslator(startDate)} 시작`}</StartDate>
      <HeadCount>
        {headCount} / {recruitCount}
      </HeadCount>
    </GoalInfoCardWrapper>
  );
};

const GoalInfoCardWrapper = styled.div`
  width: 90%;
  height: 188px;
  border-radius: 16px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 20px;
`;

const ImgBox = styled.div`
  width: 40px;
  height: 40px;
  background: #d9d9d9;
  border-radius: 8px;
`;

const TitleSpan = styled.div`
  width: 75px;
  height: 30px;
  font: ${(props) => props.theme.paragraphsP1M};
`;

const Amount = styled.div`
  margin: 4px;
  height: 30px;
  text-align: center;
  font: ${(props) => props.theme.headingH3};
`;

const StartDate = styled.div`
  margin: 4px;
  height: 21px;
  text-align: center;
  font: ${(props) => props.theme.captionC1};
`;

const HeadCount = styled.div`
  margin: 4px;
  height: 21px;
  text-align: center;
  font: ${(props) => props.theme.captionC1};
`;

export default GoalInfoCard;
