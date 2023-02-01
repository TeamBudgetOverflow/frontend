import React from 'react';
import styled from 'styled-components';

import Alert from '../../common/alert/Alert';
import ErrorMsg from '../../common/elem/ErrorMsg';
import LoadingMsg from '../../common/elem/LoadingMsg';
import GroupGoalCardSmall from '../GroupGoalCardSmall';

import useGoalLookupImpendingData from '../../../hooks/useGoalLookupImpendingData';

const ImpendingGoals = () => {
  const { isLoading, isError, impendingGoals } = useGoalLookupImpendingData();

  return (
    <Wrapper>
      <TitleBox>
        <SubTitle>마감임박 목표</SubTitle>
      </TitleBox>
      {isLoading ? (
        <AlertWrapper>
          <Alert showBgColor={true}>
            <LoadingMsg />
          </Alert>
        </AlertWrapper>
      ) : isError ? (
        <AlertWrapper>
          <Alert showBgColor={true}>
            <ErrorMsg />
          </Alert>
        </AlertWrapper>
      ) : (
        <ImpendingGoalCards>
          {impendingGoals?.map((goal) => (
            <GroupGoalCardSmall key={goal.goalId} goal={goal} />
          ))}
        </ImpendingGoalCards>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.gray200};
`;

const ImpendingGoalCards = styled.div`
  padding: 5px 22px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: nowrap;
  width: calc(100% - 44px);
  overflow-x: auto;
`;

const TitleBox = styled.div`
  padding: 0 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const AlertWrapper = styled.div`
  padding: 0 22px;
  width: calc(100% - 44px);
`;

export default ImpendingGoals;
