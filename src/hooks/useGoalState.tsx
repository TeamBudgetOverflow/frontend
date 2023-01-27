import { useEffect, useState } from 'react';

export enum GoalState {
  waiting,
  working,
  done,
}

function useGoalState({ startDate, endDate }: { startDate: Date; endDate: Date }) {
  const [state, setState] = useState<GoalState>(GoalState.waiting);
  useEffect(() => {
    if (startDate.getTime() > new Date().getTime()) setState(GoalState.waiting);
    else if (endDate.getTime() > new Date().getTime()) setState(GoalState.working);
    else setState(GoalState.done);
  }, [startDate, endDate]);

  return { state };
}

export default useGoalState;
