import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { IGoalDetail } from '../interfaces/interfaces';

import { goalApi } from '../apis/client';

import { isGroup, isMember, isWorking } from '../utils/goalStateChecker';

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
  const { isLoading, data, isError } = useQuery<IGoalDetail>('goalDetail', () => fetchGoalDetail(goalId));

  useEffect(() => {
    if (!data) return;
    setIsGroup(isGroup(data.headCount, data.curCount));
    setIsMember(isMember(loginUserId, data.members));
    setIsWorking(isWorking(new Date(data.startDate), new Date(data.endDate)));
  }, [data]);

  return { isLoading, isError, data, isGroupVal, isMemberVal, isWorkingVal };
};

export default useGoalDetailData;
