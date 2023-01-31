import React from 'react';
import styled from 'styled-components';
import LogoutButton from '../components/settings/LogoutButton';
import ModifyAccount from '../components/settings/ModifyAccount';
import ResetPinNumber from '../components/settings/ResetPinNumber';
import WithdrawalService from '../components/settings/WithdrawalService';

const UserSettings = () => {
  return (
    <Wrapper>
      <UserSettingWrapper>
        <Label>사용자 설정</Label>
        <ModifyAccount />
        <ResetPinNumber />
      </UserSettingWrapper>
      <UserSettingWrapper>
        <Label>기타</Label>
        <LogoutButton />
        <WithdrawalService />
      </UserSettingWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  gap: 4px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.gray100};
`;

const UserSettingWrapper = styled.div`
  width: 100%;
  height: 113px;
  padding: 30px 10px 10px 10px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const Label = styled.label`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
  padding: 0px 5px;
`;

export default UserSettings;
