import React from 'react';
import styled from 'styled-components';

import EmojiBox from '../../common/elem/EmojiBox';
import ProgressBar from '../../common/elem/ProgressBar';
import C2TextBox from '../../common/elem/C2TextBox';

import { dateStringTranslator } from '../../../utils/dateTranslator';
import { setProgressState } from '../../../utils/progressState';

interface IGoalInfoCardProps {
  emoji: string;
  title: string;
  amount: number;
  startDate: Date;
  curCount: number;
  headCount: number;
  isMember: boolean;
  attainment?: number;
  reportModalHandler: () => void;
}

const GoalInfoCard = ({
  emoji,
  title,
  amount,
  startDate,
  curCount,
  headCount,
  isMember,
  attainment,
  reportModalHandler,
}: IGoalInfoCardProps) => {
  return (
    <GoalInfoCardWrapper>
      <TopContent>
        <LeftContent>
          <EmojiBox unicode={emoji} boxSize={40} emojiSize={20} />
          <TitleSpan>{title}</TitleSpan>
        </LeftContent>
        <Menu onClick={reportModalHandler}>
          <svg width='24' height='24' viewBox='0 0 24 24'>
            <path
              d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </Menu>
      </TopContent>
      <BottomContent>
        <Amount>{amount.toLocaleString()} 원</Amount>
        {isMember && attainment ? (
          <ProgressBarWrapper>
            <ProgressBar percentage={attainment} height={8} borderRadius={25} />
            <ProgressInfo>
              <C2TextBox text={setProgressState(attainment)} />
              <C2TextBox text={`${Math.floor(attainment)}%`} />
            </ProgressInfo>
          </ProgressBarWrapper>
        ) : (
          <>
            <StartDate>{`${dateStringTranslator(new Date(startDate))} 시작`}</StartDate>
            <HeadCount>
              {curCount} / {headCount}
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
  background-color: white;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const TitleSpan = styled.div`
  font: ${(props) => props.theme.paragraphsP1M};
`;

const Menu = styled.div`
  width: 24px;
  height: 24px;
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
