import React from 'react';
import styled from 'styled-components';

import EmojiBox from '../../common/elem/EmojiBox';
import ProgressBar from '../../common/elem/ProgressBar';
import C3TextBox from '../../common/elem/C3TextBox';

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
  attainment?: number;
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
  attainment = 0,
  recruitMember,
}: IGoalInfoCardProps) => {
  return (
    <GoalInfoCardWrapper>
      <TopContent>
        <EmojiBox unicode={emoji} boxSize={40} emojiSize={20} />
        <TitleSpan>{title}</TitleSpan>
      </TopContent>
      <BottomContent>
        <Amount>{amount.toLocaleString()} 원</Amount>
        {participantIdFinder(recruitMember, userId) ? (
          <ProgressBarWrapper>
            <ProgressBar percentage={attainment} height={8} borderRadius={25} />
            <ProgressInfo>
              <C3TextBox text={setProgressState(attainment)} />
              <C3TextBox text={`${attainment}%`} />
            </ProgressInfo>
          </ProgressBarWrapper>
        ) : (
          <>
            {' '}
            <StartDate>{`${dateStringTranslator(new Date(startDate))} 시작`}</StartDate>
            <HeadCount>
              {recruitCount} / {headCount}
            </HeadCount>
          </>
        )}
      </BottomContent>
    </GoalInfoCardWrapper>
  );
};

const GoalInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  width: calc(100% - 40px);
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.gray300};
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const TitleSpan = styled.div`
  font: ${(props) => props.theme.paragraphsP1M};
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const Amount = styled.div`
  font: ${(props) => props.theme.headingH3};
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StartDate = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const HeadCount = styled(StartDate)``;

export default GoalInfoCard;
