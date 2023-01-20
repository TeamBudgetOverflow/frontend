import React from 'react';
import styled from 'styled-components';

import C3TextBox from '../../common/elem/C3TextBox';
import EmojiBox from '../../common/elem/EmojiBox';

import { IMemeberInfo } from '../../../interfaces/interfaces';

import { dateStringTranslator } from '../../../utils/dateTranslator';
import { participantIdFinder } from '../../../utils/detailGoalChecker';
import { setProgressState } from '../../../utils/progressState';

interface IGoalInfoCardProps {
  userId: number;
  title: string;
  emoji: string;
  startDate: Date;
  recruitCount: number;
  headCount: number;
  amount: number;
  attainment: number;
  recruitMember: Array<IMemeberInfo>;
}

const GoalInfoCard = ({
  userId,
  title,
  emoji,
  startDate,
  headCount,
  recruitCount,
  amount,
  attainment,
  recruitMember,
}: IGoalInfoCardProps) => {
  return (
    <GoalInfoCardWrapper>
      <UpperWrapper>
        <EmojiBox unicode={emoji} boxSize={40} emojiSize={20} />
        <TitleSpan>{title}</TitleSpan>
      </UpperWrapper>
      <Amount>{amount.toLocaleString()} 원</Amount>
      {participantIdFinder(recruitMember, userId) ? (
        <BottomContent>
          <ProgressBarWrapper>
            <ProgressBar width={`${attainment}%`} />
          </ProgressBarWrapper>
          <ProgressInfo>
            <C3TextBox text={setProgressState(attainment)} />
            <C3TextBox text={`${attainment}%`} />
          </ProgressInfo>
        </BottomContent>
      ) : (
        <>
          {' '}
          <StartDate>{`${dateStringTranslator(new Date(startDate))} 시작`}</StartDate>
          <HeadCount>
            {recruitCount} / {headCount}
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
  background-color: beige;
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

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 90%;
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default GoalInfoCard;
