import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SettingButton from '../common/elem/SettingButton';

// TODO: 2차개발, 실계좌 정보 관리
const ModifyAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleModifyAccountInfo = () => {
    navigate(`/users/settings/accounts/${id}`);
  };
  return <SettingButton text='계좌정보 수정' onClickHandler={handleModifyAccountInfo}></SettingButton>;
};

export default ModifyAccount;
