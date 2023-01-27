import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { userId, userGoals } from '../recoil/userAtoms';

import { IGoal } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const getSuccessCnt = (goals: Array<IGoal>) => {
  return goals.filter((goal) => new Date(goal.endDate).getTime() < new Date().getTime() && goal.attainment === 100)
    .length;
};

const getWorkingCnt = (goals: Array<IGoal>) => {
  return goals.filter((goal) => new Date(goal.startDate).getTime() < new Date().getTime()).length;
};

const getTotalCnt = (goals: Array<IGoal>) => {
  return goals.length;
};

const useUserGoalsData = ({ getUserId }: { getUserId: number }) => {
  const loginUserId = useRecoilValue(userId);
  const isLoginUser = loginUserId === getUserId;
  const setUserGoals = useSetRecoilState(userGoals);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [successCnt, setSuccessCnt] = useState<number>(0);
  const [workingCnt, setWorkingCnt] = useState<number>(0);
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery<Array<IGoal>>('userGoals', () => userAPI.getUserGoals(getUserId), {
    onSuccess: (data) => {
      if (!isLoginUser) {
        const filtered = data.filter((goal) => !goal.isPrivate);
        setSuccessCnt(getSuccessCnt(filtered));
        setWorkingCnt(getWorkingCnt(filtered));
        setTotalCnt(getTotalCnt(filtered));
        return filtered;
      }

      setUserGoals(data);
      setSuccessCnt(getSuccessCnt(data));
      setWorkingCnt(getWorkingCnt(data));
      setTotalCnt(getTotalCnt(data));
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  return { isLoading, isError, totalCnt, successCnt, workingCnt, data };
};

export default useUserGoalsData;