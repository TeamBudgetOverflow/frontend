import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { goalApi } from '../apis/client';

import { IModifyGoal } from '../interfaces/interfaces';

import { postGoal } from '../recoil/goalsAtoms';

const useGoalModify = ({ goalId }: { goalId: number }) => {
  const setPostGoal = useSetRecoilState(postGoal);
  const navigate = useNavigate();
  const { isLoading, isError, mutate } = useMutation<unknown, unknown, IModifyGoal>('modifyGoal', goalApi.modifyGoal, {
    onSuccess: () => {
      setPostGoal({
        emoji: '26f0-fe0f',
        title: '',
        description: '',
        hashTag: [''],
        amount: 1000,
        startDate: new Date(),
        endDate: new Date(),
        headCount: 1,
        isPrivate: false,
        isManual: false,
        accountId: 0,
      });

      setTimeout(() => navigate(`/goals/${goalId}`, { replace: true }), 2000);
    },
  });

  const savedPostGoal = useRecoilValue(postGoal);
  const handleModifyGoal = () => {
    mutate({ goalId, goal: savedPostGoal });
  };

  return { isLoading, isError, handleModifyGoal };
};

export default useGoalModify;
