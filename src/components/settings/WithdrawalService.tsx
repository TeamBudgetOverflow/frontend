import React from 'react';
import SettingButton from '../common/elem/SettingButton';

const WithdrawalService = () => {
  const handleWithdrawal = () => {
    console.log('탈퇴하기');
  };
  return <SettingButton text='탈퇴하기' onClickHandler={handleWithdrawal}></SettingButton>;
};

export default WithdrawalService;
