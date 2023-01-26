import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';

import useAccntManualPost from '../hooks/useAccntManualPost';

const CreateAccntManual = () => {
  const { type, goalId } = useParams();
  if (!type || (!goalId && type === 'join')) return <>잘못된 요청 값입니다</>;

  const { isLoading, isError, createManualAccnt } = useAccntManualPost({ type, goalId: Number(goalId) });
  useEffect(() => {
    createManualAccnt();
  }, []);

  if (isLoading)
    return (
      <Wrapper>
        <Info>직접 입력 계좌 정보 확인 중 입니다.</Info>
      </Wrapper>
    );

  if (isError)
    return (
      <Wrapper>
        <Info>
          직접 입력 계좌 생성이 실패했습니다.
          <br />
          다시 시도해주세요.
        </Info>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Info>직접 입력 계좌가 연결되었습니다.</Info>
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

export default CreateAccntManual;
