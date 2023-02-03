import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import TextButton from '../components/common/elem/TextButton';

import useJoinGoal from '../hooks/useJoinGoal';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const JoinGoal = () => {
  RouteChangeTracker();
  const { goalId, accountId } = useParams();
  if (!goalId || !accountId) return <>잘못된 요청 값입니다.</>;
  const { isLoading, isError, handleJoin } = useJoinGoal({ goalId: Number(goalId) });
  useEffect(() => {
    handleJoin(Number(accountId));
  }, []);

  if (isLoading)
    return (
      <Wrapper>
        <Info type='loading'>목표에 참여 요청 중 입니다.</Info>
      </Wrapper>
    );

  if (isError)
    return (
      <Wrapper>
        <Info type='error'>
          목표 참여가 실패했습니다.
          <br />
          다시 시도해주세요.
        </Info>
        <TextButton text='재시도' onClickHandler={() => handleJoin(Number(accountId))} />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Info type='goalSuccess'>목표 참여가 완료되었습니다.</Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
`;

export default JoinGoal;
