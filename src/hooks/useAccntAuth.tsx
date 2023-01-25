import { useState } from 'react';
import { useMutation } from 'react-query';

import { IBank, IReqAuthAccount, IReqAuthAccountResp } from '../interfaces/interfaces';

import { bankAPI } from '../apis/client';

interface useAccntAuthProps {
  accntNo: string;
  bank: IBank;
  oriSeqNoHandler: (oriSeqNo: string) => void;
  authReqHandler: (result: boolean) => void;
}

const useAccntAuth = ({ accntNo, bank, oriSeqNoHandler, authReqHandler }: useAccntAuthProps) => {
  const [isAuthRequested, setIsAuthRequested] = useState<boolean>(false);
  const { isLoading, isError, mutate } = useMutation<IReqAuthAccountResp, unknown, IReqAuthAccount>(
    'reqAuthAccnt',
    bankAPI.reqAuthAccnt,
    {
      onSuccess: (data) => {
        if (data.successYn === 'N') {
          throw new Error();
        }
        authReqHandler(true);
        setIsAuthRequested(true);
        oriSeqNoHandler(data.oriSeqNo);
      },
      onError: () => {
        authReqHandler(false);
        setIsAuthRequested(false);
      },
    }
  );

  const handleReqAuthAccnt = async () => {
    mutate({ bankCode: bank.bankCode, accntNo: accntNo });
  };

  return { isLoading, isError, isAuthRequested, handleReqAuthAccnt };
};

export default useAccntAuth;
