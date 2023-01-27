import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { IGoalDetail } from '../interfaces/interfaces';

import { goalApi } from '../apis/client';

import { isGroup, isMember, isWorking } from '../utils/goalInfoChecker';
import { accountIdFinder, balanceIdFinder } from '../utils/accountInfoChecker';

import { goalDetail } from '../recoil/goalsAtoms';

interface useGoalStateProps {
  loginUserId: number;
  goalId: string;
}

const fetchGoalDetail = (goalId: string) => {
  return goalApi.getGoalDetail(Number(goalId));
};

const useGoalDetailData = ({ loginUserId, goalId }: useGoalStateProps) => {
  const [isGroupVal, setIsGroup] = useState<boolean>(false);
  const [isMemberVal, setIsMember] = useState<boolean>(false);
  const [isWorkingVal, setIsWorking] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<number>(0);
  const [balanceId, setBalanceId] = useState<number>(0);
  const setGoalDetail = useSetRecoilState(goalDetail);
  const { isLoading, data, isError } = useQuery<IGoalDetail>('goalDetail', () => fetchGoalDetail(goalId), {
    onSuccess: (data) => {
      setGoalDetail(data);
      setIsGroup(isGroup(data.headCount));
      setIsMember(isMember(loginUserId, data.members));
      setIsWorking(isWorking(new Date(data.startDate), new Date(data.endDate)));
      setAccountId(accountIdFinder(data.members, loginUserId));
      setBalanceId(balanceIdFinder(data.members, loginUserId));
    },
  });

  return { isLoading, isError, data, isGroupVal, isMemberVal, isWorkingVal, accountId, balanceId };
};

export default useGoalDetailData;
