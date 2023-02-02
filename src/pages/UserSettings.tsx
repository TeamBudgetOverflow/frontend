import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import Icon from '../components/common/elem/Icon';
import TextButton from '../components/common/elem/TextButton';
import LogoutButton from '../components/settings/LogoutButton';
import ModifyAccount from '../components/settings/ModifyAccount';
import WithdrawalService from '../components/settings/WithdrawalService';

import { userAPI } from '../apis/client';

// TODO: 2차개발, 핀번호 재설정
// TODO: 2차개발, 실계좌 정보 관리
const UserSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isWithdrawaled, setIsWithdrawaled] = useState<boolean>(false);
  const { mutate } = useMutation('withdrawalService', () => userAPI.deleteUserWithdrawalService(Number(id)), {
    onSuccess: () => {
      localStorage.clear();
      setIsWithdrawaled(true);
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      } else {
        alert(e);
        navigate('/home');
      }
    },
  });

  const [showWarning, setShowWarning] = useState<boolean>(false);

  if (isWithdrawaled) return <Info type='success'>탈퇴가 완료되었습니다.</Info>;

  if (showWarning)
    return (
      <InfoWrapper>
        <TopContentWrapper>
          <Icon
            width={80}
            height={80}
            color='#FF6666'
            path='M40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0ZM40.2223 19.5553C42.8723 19.5553 44.9904 21.7388 44.8852 24.362L44.091 44.1774C44.01 46.1982 42.3328 47.7951 40.2914 47.7951C38.2602 47.7951 36.5876 46.2135 36.493 44.2033L35.5608 24.3939C35.4368 21.7589 37.5598 19.5553 40.2223 19.5553ZM40.304 60.4442C37.794 60.4442 36.4159 58.7283 36.4159 56.5711C36.4159 54.4138 37.794 52.6979 40.304 52.6979C42.814 52.6979 44.192 54.4138 44.192 56.5711C44.192 58.7283 42.814 60.4442 40.304 60.4442Z'
          />
          <Text>
            탈퇴를 진행하면
            <br /> 이전 데이터 복구가 불가능합니다.
            <br />
            탈퇴를 진행하시겠습니까?
          </Text>
        </TopContentWrapper>
        <BtnWrapper>
          <TextButton text='탈퇴하기' onClickHandler={mutate} />
          <TextButton text='취소' bgColor='#e4e4e4' onClickHandler={() => setShowWarning(false)} />
        </BtnWrapper>
      </InfoWrapper>
    );

  return (
    <Wrapper>
      <UserSettingWrapper>
        <Label>사용자 설정</Label>
        <ModifyAccount />
      </UserSettingWrapper>
      <UserSettingWrapper>
        <Label>기타</Label>
        <LogoutButton />
        <WithdrawalService warningHandler={() => setShowWarning(true)} />
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

const InfoWrapper = styled.div`
  position: relative;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 44px);
  height: calc(100% - 40px);
  background-color: white;
`;

const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  line-height: 150%;
  text-align: center;
  font: ${(props) => props.theme.headingH2};
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserSettingWrapper = styled.div`
  width: 100%;
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
