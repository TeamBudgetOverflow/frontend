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
        <SubTitle>모집 마감 임박 목표</SubTitle>
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
          {impendingGoals.length === 0 ? (
            <EmptyData>
              <InfoText>{`현재 모집 중인 목표가 없습니다.\n그룹 목표를 추가해보세요!`}</InfoText>
            </EmptyData>
          ) : (
            impendingGoals?.map((goal) => <GroupGoalCardSmall key={goal.goalId} goal={goal} />)
          )}
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

const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.gray300};
`;

const InfoText = styled.div`
  text-align: center;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.primary400};
  line-height: 150%;
  white-space: pre-wrap;
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
