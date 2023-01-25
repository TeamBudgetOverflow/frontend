import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import AccountNoInput from '../components/account/AccountNoInput';
import AccountNoValidate from '../components/account/AccountNoValidate';
import AccountInfoInput from '../components/account/AccountInfoInput';

import useAccntAuthState from '../hooks/useAccntAuthState';

const CreateAccntAuto = () => {
  const { goalId } = useParams();
  const [joinGoalId, setJoinGoalId] = useState<number>(0);
  useEffect(() => {
    if (goalId) setJoinGoalId(Number(goalId));
  }, [goalId]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleAccountId = (accountId: number) => {
    pathname.includes('join')
      ? navigate(`/goals/join/${joinGoalId}/accounts/${accountId}`)
      : navigate(`/goals/post/${accountId}`);
  };

  const {
    oriSeqNo,
    isAuthRequested,
    isAuthenticated,
    handleSetOriSeqNo,
    handleIsAuthRequested,
    handleIsAuthenticated,
    handleAccntNoEdit,
  } = useAccntAuthState();

  if (!isAuthRequested)
    return (
      <Wrapper>
        <AccountNoInput oriSeqNoHandler={handleSetOriSeqNo} authReqHandler={handleIsAuthRequested} />
      </Wrapper>
    );
  if (isAuthRequested && !isAuthenticated)
    return (
      <Wrapper>
        <AccountNoValidate
          oriSeqNo={oriSeqNo}
          authHandler={handleIsAuthenticated}
          accntNoEditHandler={handleAccntNoEdit}
        />
      </Wrapper>
    );
  if (isAuthenticated)
    return (
      <Wrapper>
        <AccountInfoInput accountIdHandler={handleAccountId} />
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

export default CreateAccntAuto;
