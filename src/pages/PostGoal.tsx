import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import TextButton from '../components/common/elem/TextButton';

import usePostGoal from '../hooks/usePostGoal';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const PostGoal = () => {
  RouteChangeTracker();
  const { accountId } = useParams();
  if (!accountId) return <>잘못된 요청 값입니다.</>;
  const { isLoading, isError, handlePostGoal } = usePostGoal({ accountId: Number(accountId) });
  useEffect(() => {
    handlePostGoal();
  }, []);

  if (isLoading)
    return (
      <Wrapper>
        <Info type='loading'>목표 생성 중 입니다.</Info>
      </Wrapper>
    );

  if (isError)
    return (
      <Wrapper>
        <Info type='error'>
          목표 생성이 실패했습니다.
          <br />
          다시 시도해주세요.
        </Info>
        <TextButton text='재시도' onClickHandler={handlePostGoal} />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Info type='goalSuccess'>목표 생성이 완료되었습니다.</Info>
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

export default PostGoal;
