import React from 'react';
import SettingButton from '../common/elem/SettingButton';

const LogoutButton = () => {
  const handleLogoutButton = () => {
    console.log('로그아웃');
  };
  return <SettingButton text='로그아웃' onClickHandler={handleLogoutButton}></SettingButton>;
};

export default LogoutButton;
