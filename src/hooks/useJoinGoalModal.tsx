import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useJoinGoalModal = ({ goalId }: { goalId: number }) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  const [isManual, setIsManual] = useState<boolean>(false);
  const handleSelectOption = (isTrue: boolean) => {
    setIsManual(isTrue);
  };
  const handleSelectOptionDone = () => {
    if (isManual) {
      handleJoinEnd();
      navigate(`/goals/join/${goalId}/accounts/manual`);
      return;
    }

    setShowOption(false);
    setShowAccounts(true);
  };

  const [showAccounts, setShowAccounts] = useState<boolean>(false);
  const [selectedAccntId, setSelectedAccntId] = useState<number>(0);
  const handleSelectAccnt = (accountId: number) => {
    setSelectedAccntId(accountId);
  };
  const navigate = useNavigate();
  const handleSelectAccntDone = () => {
    if (selectedAccntId > 0) {
      handleJoinEnd();
      navigate(`/goals/join/${goalId}/accounts/${selectedAccntId}`);
      return;
    }

    handleJoinEnd();
    navigate(`/goals/join/${goalId}/accounts/auto`);
  };

  const handleJoinStart = () => {
    setShowOption(true);
  };

  const handleJoinEnd = () => {
    if (showOption) setShowOption(false);
    if (showAccounts) setShowAccounts(false);
  };

  return {
    showOption,
    showAccounts,
    selectedAccntId,
    handleJoinStart,
    handleJoinEnd,
    handleSelectOption,
    handleSelectOptionDone,
    handleSelectAccnt,
    handleSelectAccntDone,
  };
};

export default useJoinGoalModal;
