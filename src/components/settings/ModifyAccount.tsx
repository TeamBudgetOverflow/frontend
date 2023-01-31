import React from 'react';
import SettingButton from '../common/elem/SettingButton';

const ModifyAccount = () => {
  const handleModifyAccountInfo = () => {
    console.log('계좌정보 수정');
  };
  return <SettingButton text='계좌정보 수정' onClickHandler={handleModifyAccountInfo}></SettingButton>;
};

export default ModifyAccount;
