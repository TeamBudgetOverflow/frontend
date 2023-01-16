import React from 'react';
import styled from 'styled-components';

import { dateStringTranslator } from '../../../utils/dateTranslator';

interface IGoalInfoCardProps {
  title: string;
  startDate: Date;
  recruitCount?: number;
  headCount?: number;
  amount: number;
  isPrivate?: boolean;
  attainment?: number;
}

// TODO: 목표 대표 이미지 get
// TODO: 개인 목표 달성율에 따른 문구 연결
const GoalInfoCard = ({
  title,
  startDate,
  headCount,
  recruitCount,
  amount,
  isPrivate,
  attainment,
}: IGoalInfoCardProps) => {
  return (
    <GoalInfoCardWrapper>
      <UpperWrapper>
        <ImgBox>img</ImgBox>
        <TitleSpan>{title}</TitleSpan>
      </UpperWrapper>
      <Amount>{amount.toLocaleString()} 원</Amount>
      {isPrivate ? (
        <>
          <ProgressBarWrapper>
            <ProgressBar width={`${attainment}%`} />
          </ProgressBarWrapper>
        </>
      ) : (
        <>
          <StartDate>{`${dateStringTranslator(startDate)} 시작`}</StartDate>
          <HeadCount>
            {headCount} / {recruitCount}
          </HeadCount>
        </>
      )}
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

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 90%;
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

export default GoalInfoCard;
