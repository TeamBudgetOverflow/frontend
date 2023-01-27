import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { IPostGoal } from '../interfaces/interfaces';

import { postGoalType } from '../recoil/goalsAtoms';
import { postGoal } from '../recoil/goalsAtoms';

interface useGoalInputProps {
  type: 'post' | 'modify';
  inputVal: IPostGoal;
}

const useGoalInput = ({ type, inputVal }: useGoalInputProps) => {
  const setPostGoalType = useSetRecoilState(postGoalType);
  const setPostGoal = useSetRecoilState(postGoal);
  const navigate = useNavigate();
  const handleSaveGoalInput = () => {
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
      accountId: 0,
    });

    setPostGoalType({ isGroup: false });

    if (type === 'post') {
      if (inputVal.isManual) {
        navigate(`/goals/post/0/accounts/manual`, { replace: true });
      } else {
        navigate('/accounts/choose');
      }
    }
  };

  return { handleSaveGoalInput };
};

export default useGoalInput;
