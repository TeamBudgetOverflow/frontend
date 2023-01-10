import React from 'react';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
import { userProfile } from '../../../recoil/atoms';
import DdayCounter from '../../common/elem/DdayCounter';
import ProfileImg from '../../common/elem/ProfileImg';
import ProgressBar from '../../common/elem/ProgressBar';
import EndDateIndicator from '../../common/elem/EndDateIndicator';
import PercentageIndicator from '../../common/elem/PercentageIndicator';

export type GoalAtomProps = {
  goals: {
    title: string;
    description?: string;
    isPrivate: boolean;
    hashtag?: string;
    initialAmount: number;
    currentAmount: number;
    startDate: Date;
    endDate: Date;
    headCount: number;
  };
};

const GoalCards = ({ goals }: GoalAtomProps) => {
  const profile = useRecoilValue(userProfile);
  return (
    <CardWrapper>
      <UpperWrapper>
        <GoalStatusWrapper>
          <span>진행중</span>
        </GoalStatusWrapper>
        <DdayCounterWrapper>
          <DdayCounter endDate={goals.endDate} />
        </DdayCounterWrapper>
      </UpperWrapper>
      <MiddleWrapper>
        <ProfileImg
          size={52}
          url={
            profile.img.length === 0
              ? require('../../../assets/img/default.png')
              : profile.img
          }
        />{' '}
        <TitleWrapper>
          <CardTitle>{goals.title}</CardTitle>
          <AmountAcumulated>
            {goals.currentAmount - goals.initialAmount}원
          </AmountAcumulated>
        </TitleWrapper>
      </MiddleWrapper>
      <ProgressBarWrapper>
        <ProgressBar
          initialAmount={goals.initialAmount}
          currentAmount={goals.currentAmount}
        />
      </ProgressBarWrapper>

      <LowLineWrapper>
        <EndDateIndicator endDate={goals.endDate} />
        <PercentageIndicator
          initialAmount={goals.initialAmount}
          currentAmount={goals.currentAmount}
        />
      </LowLineWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 370px;
  height: 120px;
  padding: 12px;
  margin: 22px;
  border: 1px solid;
  border-radius: 16px;
`;

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GoalStatusWrapper = styled.div`
  padding: 5px;
  width: 45%;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
`;

const DdayCounterWrapper = styled.div`
  padding: 5px;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MiddleWrapper = styled.div`
  padding: 0px 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const TitleWrapper = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardTitle = styled.span`
  padding: 1px 0px;
  font-size: 20px;
`;

const AmountAcumulated = styled.span`
  padding: 1px 0px;
  font-size: 20px;
`;

const ProgressBarWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LowLineWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default GoalCards;
