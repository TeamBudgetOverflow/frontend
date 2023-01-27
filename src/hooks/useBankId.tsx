import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { banksInfo } from '../recoil/accntAtoms';

const useBankId = ({ bankCode }: { bankCode: string }) => {
  const [bankId, setBankId] = useState<number>(0);
  const banks = useRecoilValue(banksInfo);
  const getBankId = () => {
    const bank = banks.find((bank) => bank.bankCode === bankCode);
    if (!bank) return setBankId(0);
    return setBankId(bank.bankId);
  };

  useEffect(() => {
    getBankId();
  }, [bankCode]);

  return { bankId };
};

export default useBankId;
