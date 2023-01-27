import React, { useEffect, useState } from 'react';
import useAccountsData from '../../../hooks/useAccountsData';
import { isManualAccntAddable } from '../../../utils/accountInfoChecker';

import ToggleSelectBox from '../../common/elem/ToggleSelectBox';
import ValidateMsg from '../../common/elem/ValidateMsg';

interface AccntToggleProps {
  initVal: boolean;
  changeHandler: (val: boolean) => void;
}

const AccntToggle = ({ initVal, changeHandler }: AccntToggleProps) => {
  const [isManual, setisManual] = useState<boolean>(initVal);
  const handleSelectisAuto = (isTrue: boolean) => {
    setisManual(isTrue);
  };

  useEffect(() => {
    changeHandler(isManual);
  }, [isManual]);

  const { isLoading, isError, accounts } = useAccountsData();

  return (
    <>
      <ToggleSelectBox
        title='계좌 잔액 직접 입력'
        description='실제 계좌를 연결하지 않고 계좌 잔액을 직접 입력합니다.'
        initVal={isManual}
        selectHandler={handleSelectisAuto}
        isDisabled={!isManualAccntAddable(accounts)}
      />
      {isManual && !isManualAccntAddable(accounts) ? (
        <ValidateMsg msg='잔액은 최대 10개까지 관리할 수 있습니다.' type='error' />
      ) : (
        <></>
      )}
    </>
  );
};

export default AccntToggle;
