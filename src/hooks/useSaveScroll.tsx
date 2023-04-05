import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { scrollPosition } from '../recoil/goalsAtoms';

const useSaveScroll = () => {
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const saveScrollPosition = useSetRecoilState(scrollPosition);
  const [isScrollSaved, setIsScrollSaved] = useState(false);
  const [goalId, setGoalId] = useState(0);
  const handleGoalClick = (goalId: number) => {
    setGoalId(goalId);
    handleSaveScroll(scrollBoxRef.current ? scrollBoxRef.current.scrollTop : 0);
    setIsScrollSaved(true);
  };

  const handleSaveScroll = (scrollPosition: number) => {
    saveScrollPosition(scrollPosition);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isScrollSaved) navigate(`/goals/${goalId}`);
  }, [isScrollSaved]);

  return { scrollBoxRef, handleGoalClick, handleSaveScroll };
};

export default useSaveScroll;
