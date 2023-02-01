import { useState } from 'react';

import { IBank } from '../interfaces/interfaces';

const useBankSelect = ({ initVal }: { initVal: IBank }) => {
  const [showBanks, setShowBanks] = useState<boolean>(false);
  const handleShowBanks = () => {
    setShowBanks(!showBanks);
  };
  const [selectedBank, setSelectedBank] = useState<IBank>(initVal);
  const handleBankSelect = (bank: IBank) => {
    setSelectedBank(bank);
    setShowBanks(false);
  };

  return { showBanks, selectedBank, handleShowBanks, handleBankSelect };
};

export default useBankSelect;
