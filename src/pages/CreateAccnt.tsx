import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import AccountNoInput from '../components/goal/post/AccountNoInput';
import AccountNoValidate from '../components/goal/post/AccountNoValidate';
import AccountInfoInput from '../components/goal/post/AccountInfoInput';
import { useNavigate } from 'react-router-dom';

const CreateAccnt = () => {
  const [authNo, setAuthNo] = useState<string>('');
  const handleSetAuthNo = (oriSeqNo: string) => {
    setAuthNo(oriSeqNo);
  };
  const [authReqCnt, setAuthReqCnt] = useState<number>(0);
  const [isAuthRequested, setIsAuthRequested] = useState<boolean>(false);
  const handleIsAuthRequested = (result: boolean) => {
    setAuthReqCnt((prev) => prev + 1);
    setIsAuthRequested(result);
  };
  const handleAccntNoEdit = () => {
    // TODO: prevent too many accnt auth request until 24 hours
    if (authReqCnt > 3) alert('최대 계좌 수정 횟수는 3회입니다.');
    setIsAuthRequested(false);
    setAuthNo('');
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleIsAuthenticated = (result: boolean) => {
    setIsAuthenticated(result);
  };

  const [goalId, setGoalId] = useState<number>(0);
  const handleGoalId = (goalId: number) => {
    setGoalId(goalId);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (goalId !== 0) navigate(`/goals/${goalId}`);
  }, [goalId]);

  if (!isAuthRequested)
    return (
      <Wrapper>
        <AccountNoInput authNoHandler={handleSetAuthNo} authReqHandler={handleIsAuthRequested} />
      </Wrapper>
    );
  if (isAuthRequested && !isAuthenticated)
    return (
      <Wrapper>
        <AccountNoValidate
          oriSeqNo={authNo}
          authHandler={handleIsAuthenticated}
          accntNoEditHandler={handleAccntNoEdit}
        />
      </Wrapper>
    );
  if (isAuthenticated)
    return (
      <Wrapper>
        <AccountInfoInput goalIdHandler={handleGoalId} />
      </Wrapper>
    );
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
  overflow-y: auto;
  background-color: white;
`;

export default CreateAccnt;
