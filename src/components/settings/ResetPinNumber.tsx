import React from 'react';
import SettingButton from '../common/elem/SettingButton';

const ResetPinNumber = () => {
  const handleResetPinNumber = () => {
    console.log('계핀번호 재설정');
  };
  return <SettingButton text='핀번호 재설정' onClickHandler={handleResetPinNumber}></SettingButton>;
};

export default ResetPinNumber;
