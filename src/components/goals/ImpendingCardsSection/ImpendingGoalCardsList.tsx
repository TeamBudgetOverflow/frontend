import React from 'react';

import styled from 'styled-components';
import ImpendingGoalCards from './ImpendingGoalCards';

export interface GoalsArrProp {
  goals: [
    {
      goalId: number;
      title: string;
      description?: string;
      isPrivate: boolean;
      hashtag?: string;
      initialAmount: number;
      currentAmount: number;
      startDate: Date;
      endDate: Date;
      headCount: number;
    }
  ];
}

const ImpendingGoalCardsList = ({ goals }: GoalsArrProp) => {
  const impendingGoalCard = goals.map((goal) => (
    <ImpendingGoalCards
      key={goal.goalId}
      title={goal.title}
      hashtag={goal.hashtag}
    />
  ));
  return (
    <ImpendingGoalCardsListLayout>
      <UpperWrapper>
        <Paragraphs>마감임박 목표</Paragraphs>
        <Paragraphs>모두보기</Paragraphs>
      </UpperWrapper>
      {impendingGoalCard}
    </ImpendingGoalCardsListLayout>
  );
};

const ImpendingGoalCardsListLayout = styled.div`
  width: 100%;
  height: 180px;
  padding: 20px;
  border-bottom: 2px solid;
`;

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Paragraphs = styled.span`
  font: ${(props) => props.theme.captionC1};
`;

export default ImpendingGoalCardsList;
