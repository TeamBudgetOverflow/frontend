import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { GoalStatus, IGoalDetail } from '../interfaces/interfaces';

import { goalApi } from '../apis/client';

import { getGoalStatus, isGroup, isMember } from '../utils/goalInfoChecker';
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
  const [status, setStatus] = useState<GoalStatus>(GoalStatus.proceeding);
  const [accountId, setAccountId] = useState<number>(0);
  const [balanceId, setBalanceId] = useState<number>(0);
  const setGoalDetail = useSetRecoilState(goalDetail);
  const navigate = useNavigate();
  const { isLoading, data, isError } = useQuery<IGoalDetail>('goalDetail', () => fetchGoalDetail(goalId), {
    onSuccess: (data) => {
      setGoalDetail(data);
      setIsGroup(isGroup(data.headCount));
      setIsMember(isMember(loginUserId, data.members));
      setStatus(getGoalStatus(new Date(data.startDate), new Date(data.endDate)));
      setAccountId(accountIdFinder(data.members, loginUserId));
      setBalanceId(balanceIdFinder(data.members, loginUserId));
    },
    onError: (e) => {
      if (e === 404) {
        navigate('/notfound', { replace: true });
      }
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  return { isLoading, isError, data, isGroupVal, isMemberVal, status, accountId, balanceId };
};

export default useGoalDetailData;
