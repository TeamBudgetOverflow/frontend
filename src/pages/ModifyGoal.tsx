import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import LoadingIcon from '../components/common/elem/LoadingIcon';
import TextButton from '../components/common/elem/TextButton';

import useGoalModify from '../hooks/useGoalModify';

const ModifyGoal = () => {
  const { id } = useParams();
  if (!id) return <>잘못된 요청 값입니다</>;
  const { isLoading, isError, handleModifyGoal } = useGoalModify({ goalId: Number(id) });

  useEffect(() => {
    handleModifyGoal();
  }, []);

  if (isLoading)
    return (
      <LoadingWrapper>
        <LoadingIcon size={50} color='#2bc470' />
      </LoadingWrapper>
    );

  if (isError)
    return (
      <Wrapper>
        <Info>
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

const LoadingWrapper = styled(Wrapper)`
  justify-content: center;
  align-items: center;
`;

export default ModifyGoal;
