import { useState } from 'react';

const useAccntAuthState = () => {
  const [oriSeqNo, setOriSeqNo] = useState<string>('');
  const handleSetOriSeqNo = (oriSeqNo: string) => {
    setOriSeqNo(oriSeqNo);
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
    setOriSeqNo('');
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleIsAuthenticated = (result: boolean) => {
    setIsAuthenticated(result);
  };

  return {
    oriSeqNo,
    isAuthRequested,
    isAuthenticated,
    handleSetOriSeqNo,
    handleIsAuthRequested,
    handleIsAuthenticated,
    handleAccntNoEdit,
  };
};

export default useAccntAuthState;
