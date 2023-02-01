import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { IPostGoal } from '../interfaces/interfaces';

import { postGoalType } from '../recoil/goalsAtoms';
import { postGoal } from '../recoil/goalsAtoms';

const useGoalModifyInput = ({ goalId }: { goalId: number }) => {
  const setPostGoalType = useSetRecoilState(postGoalType);
  const setPostGoal = useSetRecoilState(postGoal);
  const navigate = useNavigate();
  const handleSaveGoalInput = (inputVal: IPostGoal) => {
    setPostGoal({
      emoji: inputVal.emoji,
      title: inputVal.title,
      description: inputVal.description,
      hashTag: [...inputVal.hashTag],
      amount: inputVal.amount,
      startDate: inputVal.startDate,
      endDate: inputVal.endDate,
      headCount: inputVal.headCount,
      isPrivate: inputVal.isPrivate,
      isManual: inputVal.isManual,
      accountId: inputVal.accountId,
    });

    setPostGoalType({ isGroup: false });

    navigate(`/goals/${goalId}/modify`, { replace: true });
  };

  return { handleSaveGoalInput };
};

export default useGoalModifyInput;
