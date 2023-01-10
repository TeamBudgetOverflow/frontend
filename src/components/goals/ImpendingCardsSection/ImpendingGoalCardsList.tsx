import React from 'react';

import styled from 'styled-components';
import ImpendingGoalCards from './ImpendingGoalCards';

const ImpendingGoalCardsList = () => {
  return (
    <ImpendingGoalCardsListLayout>
      <UpperWrapper>
        <Paragraphs>마감임박 목표</Paragraphs>
        <Paragraphs>모두보기</Paragraphs>
      </UpperWrapper>
      <ImpendingGoalCards />
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
