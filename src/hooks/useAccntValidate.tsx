import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { accntInfo } from '../recoil/accntAtoms';

import { IValidateAccount, IValidateAccountResp } from '../interfaces/interfaces';

import { bankAPI } from '../apis/client';
import { useMutation } from 'react-query';

const useAccntValidate = () => {
  const savedAccntInfo = useRecoilValue(accntInfo);
  const [accnt, setAccnt] = useState<IValidateAccount>({
    bankCode: savedAccntInfo.bankCode,
    bankUserId: '',
    bankUserPw: '',
    accntNo: savedAccntInfo.accntNo,
    accntPw: '',
  });
  const handleBankUserIdChange = (bankUserId: string) => {
    setAccnt((prev) => {
      return { ...prev, bankUserId };
    });
  };
  const handleBankUserPwChange = (bankUserPw: string) => {
    setAccnt((prev) => {
      return { ...prev, bankUserPw };
    });
  };
  const handleAccntPwChange = (accntPw: string) => {
    setAccnt((prev) => {
      return { ...prev, accntPw };
    });
  };

  const [isValidAccnt, setIsValidAccnt] = useState<boolean>(false);
  const { mutate } = useMutation<IValidateAccountResp, unknown, IValidateAccount>(
    'validateAccnt',
    bankAPI.validateAccntInfo,
    {
      onSuccess: (data) => {
        if (data.common.errYn === 'Y') {
          return alert(data.common.errMsg);
        }

        setIsValidAccnt(true);
      },
      onError: () => {
        setIsValidAccnt(false);
      },
    }
  );
  const handleValidate = () => {
    mutate(accnt);
  };

  return { isValidAccnt, accnt, handleAccntPwChange, handleBankUserIdChange, handleBankUserPwChange, handleValidate };
};

export default useAccntValidate;
