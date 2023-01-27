import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import InfoLoading from '../components/common/alert/InfoLoading';
import TextButton from '../components/common/elem/TextButton';

import useGoalModify from '../hooks/useGoalModify';

const ModifyGoal = () => {
  const { id } = useParams();
  if (!id)
    return (
      <Wrapper>
        <Info type='error'>잘못된 요청값 입니다.</Info>
      </Wrapper>
    );

  const { isLoading, isError, handleModifyGoal } = useGoalModify({ goalId: Number(id) });

  useEffect(() => {
    handleModifyGoal();
  }, []);

  if (isLoading) return <InfoLoading />;

  if (isError)
    return (
      <Wrapper>
        <Info type='error'>
          목표 수정이 실패했습니다.
          <br />
          다시 시도해주세요.
        </Info>
        <TextButton text='재시도' onClickHandler={handleModifyGoal} />
      </Wrapper>
    );
  return <div></div>;
};

const Wrapper = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
`;

export default ModifyGoal;
