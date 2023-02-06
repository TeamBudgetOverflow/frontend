import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { userId } from '../recoil/userAtoms';

import { GoalStatus, GoalStatusStringtoType, IGoal } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

const getSuccessCnt = (goals: Array<IGoal>) => {
  return goals.filter((goal) => GoalStatusStringtoType(goal.status) === GoalStatus.done && goal.attainment === 100)
    .length;
};

const getWorkingCnt = (goals: Array<IGoal>) => {
  return goals.filter((goal) => GoalStatusStringtoType(goal.status) === GoalStatus.proceeding).length;
};

const getTotalCnt = (goals: Array<IGoal>) => {
  return goals.length;
};

const useUserGoalsData = ({ getUserId }: { getUserId: number }) => {
  const loginUserId = useRecoilValue(userId);
  const isLoginUser = loginUserId === getUserId;
  const [goals, setGoals] = useState<Array<IGoal>>([]);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [successCnt, setSuccessCnt] = useState<number>(0);
  const [workingCnt, setWorkingCnt] = useState<number>(0);
  const navigate = useNavigate();
  const { isLoading, isError } = useQuery<Array<IGoal>>('userGoals', () => userAPI.getUserGoals(getUserId), {
    onSuccess: (data) => {
      if (!isLoginUser) {
        const filtered = data.filter((goal) => !goal.isPrivate);
        setSuccessCnt(getSuccessCnt(filtered));
        setWorkingCnt(getWorkingCnt(filtered));
        setTotalCnt(getTotalCnt(filtered));
        setGoals(data);
        return;
      }

      setSuccessCnt(getSuccessCnt(data));
      setWorkingCnt(getWorkingCnt(data));
      setTotalCnt(getTotalCnt(data));
      setGoals(data);
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

  return { isLoading, isError, totalCnt, successCnt, workingCnt, goals };
};

export default useUserGoalsData;
