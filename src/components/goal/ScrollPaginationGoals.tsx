import React from 'react';
import styled from 'styled-components';

import Alert from '../common/alert/Alert';
import LoadingMsg from '../common/elem/LoadingMsg';
import ErrorMsg from '../common/elem/ErrorMsg';
import GroupGoalCard from './GroupGoalCard';

import { ISearchGoal } from '../../interfaces/interfaces';

interface scrollPaginationGoalsProps {
  isLoading: boolean;
  isError: boolean;
  emptyMsg: string;
  goals: Array<ISearchGoal>;
  goalClickHandler: (goalId: number) => void;
}

const ScrollPaginationGoals = ({
  isLoading,
  isError,
  emptyMsg,
  goals,
  goalClickHandler,
}: scrollPaginationGoalsProps) => {
  if (isLoading && goals.length === 0)
    return (
      <Alert showBgColor={true}>
        <LoadingMsg />
      </Alert>
    );

  if (isError && goals.length === 0)
    <Alert showBgColor={true}>
      <ErrorMsg />
    </Alert>;

  return (
    <>
      {goals.length === 0 ? (
        <EmptyData>
          <InfoText>{emptyMsg}</InfoText>
        </EmptyData>
      ) : (
        goals.map((goal) => (
          <GroupGoalCard key={goal.goalId} goal={goal} goalClickHandler={() => goalClickHandler(goal.goalId)} />
        ))
      )}
      {isLoading ? (
        <Alert showBgColor={true}>
          <LoadingMsg />
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

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

export default ScrollPaginationGoals;
