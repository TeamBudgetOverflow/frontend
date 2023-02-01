import React, { useEffect, useState } from 'react';
import useAccountsData from '../../../hooks/useAccountsData';

import ToggleSelectBox from '../../common/elem/ToggleSelectBox';
import ValidateMsg from '../../common/elem/ValidateMsg';

import { isManualAccountAddable } from '../../../utils/accountInfoChecker';

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
        // TODO: 토글 disable 수정 페이지에서만 동작하도록
        // 직접 입력 계좌 addable 함수 디버깅
        // isLoading, isError 일 때 disable
        // isDisabled={!isManualAccntAddable(accounts)}
      />
      {isError ? <ValidateMsg msg='계좌 정보 조회를 실패했습니다.' type='error' /> : <></>}
      {isManual && !isManualAccountAddable(accounts) ? (
        <ValidateMsg msg='직접 입력 목표는 최대 10개까지 관리할 수 있습니다.' type='error' />
      ) : (
        <></>
      )}
    </>
  );
};

export default AccntToggle;
