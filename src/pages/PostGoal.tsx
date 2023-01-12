import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import CommonInputSection from '../components/goal/post/CommonInputSection';
import DateSelectSection from '../components/goal/post/DateSelectSection';
import InputBox from '../components/common/elem/InputBox';
import ValidateMsg from '../components/common/elem/ValidateMsg';
import RadioSelectBox from '../components/common/elem/RadioSelectBox';
import AccountModal from '../components/common/modal/AccountModal';
import TextButton from '../components/common/elem/TextButton';

import useNumInput from '../hooks/useNumInput';

import { IAccountInfo } from '../interfaces/interfaces';
import AccountInfoCard from '../components/account/AccountInfoCard';
import { useQuery } from 'react-query';
import { bankAPI } from '../apis/client';
import { privateInfoFormatter } from '../utils/privateInfoFormatter';

export interface IGoalCommonInfo {
  title: string;
  description: string;
  amount: number;
  hashtag: Array<string>;
}

export interface IGoalDateInfo {
  startDate: Date;
  endDate: Date;
}

const PostGoal = () => {
  const [isGoalCommonValidated, setGoalCommonValidated] = useState<boolean>(false);
  const [goalCommonInfo, setGoalCommonInfo] = useState<IGoalCommonInfo>();
  const handleGoalCommonChange = (goalCommonInfo: IGoalCommonInfo) => {
    setGoalCommonInfo(goalCommonInfo);
  };

  const [goalDateInfo, setGoalDateInfo] = useState<IGoalDateInfo>();
  const handleGoalDateChange = (goalDateInfo: IGoalDateInfo) => {
    setGoalDateInfo(goalDateInfo);
  };

  const {
    value: headCount,
    errMsg: headCountErr,
    onChange: changeHeadCount,
    reset: restHeadCount,
  } = useNumInput({ initValue: 0, min: 1, max: 100, type: '인원' });

  const [isGroup, setIsGroup] = useState<boolean>(false);
  const handleSelectIsGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '그룹') {
      return setIsGroup(true);
    }
    setIsGroup(false);
  };

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const handleSelectIsPrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '미공개') return setIsPrivate(true);
    setIsPrivate(false);
  };

  const [isAuto, setIsAuto] = useState<boolean>(false);
  const handleSelectIsAuto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '실계좌 연결') return setIsAuto(true);
    setIsAuto(false);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isAuto) {
      return setIsModalOpen(true);
    }
    setIsModalOpen(false);
  }, [isAuto]);

  const [isAuthRequested, setIsAuthRequested] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isValidAccount, setIsValidAccount] = useState<boolean>(false);
  const [accntInfo, setAccntInfo] = useState<IAccountInfo>({
    bankId: 0,
    bankUserId: '',
    bankUserPw: '',
    accntNo: '',
    accntPw: '',
  });
  const [formattedAccntInfo, setFormattedAccntInfo] = useState<IAccountInfo>({
    bankId: 0,
    bankUserId: '',
    bankUserPw: '',
    accntNo: '',
    accntPw: '',
  });
  const [oriSeqNo, setOriSeqNo] = useState<string>('');
  const handleReqAuthAccnt = async (accountInfo: IAccountInfo) => {
    try {
      // TODO: test API request
      const { data } = await bankAPI.reqAuthAccnt(accountInfo);
      if (data.successYn === 'N') {
        throw new Error();
      }
      setIsAuthRequested(true);
      setOriSeqNo(data.oriSeqNo);
      setAccntInfo(accountInfo);
    } catch (e) {
      setIsAuthRequested(false);
      return alert('인증 요청에 실패했습니다. 다시 시도해주세요');
    }
  };

  const handleAuthAccnt = async (authString: string) => {
    try {
      // TODO: test API request
      const { data } = await bankAPI.authAccnt({ oriSeqNo, authString });
      setIsAuthenticated(true);

      if (data.successYn === 'N') {
        setIsValidAccount(false);
        return;
      }

      setIsValidAccount(true);
      setFormattedAccntInfo({
        bankId: accntInfo.bankId,
        bankUserId: privateInfoFormatter({
          data: accntInfo.bankUserId,
          showLen: 3,
          showDir: 'head',
        }),
        bankUserPw: '',
        accntNo: privateInfoFormatter({
          data: accntInfo.accntNo,
          showLen: 4,
          showDir: 'tail',
        }),
        accntPw: '',
      });
    } catch (e) {
      setIsAuthenticated(false);
      setIsValidAccount(false);
      setFormattedAccntInfo({
        bankId: 0,
        bankUserId: '',
        bankUserPw: '',
        accntNo: '',
        accntPw: '',
      });

      return alert('인증에 실패했습니다. 다시 시도해주세요');
    } finally {
      closeModal();
    }
  };

  const [isValidGoal, setIsValidGoal] = useState<boolean>(false);
  const validate = () => {
    if (isGoalCommonValidated && isValidAccount && headCountErr.length === 0) return setIsValidGoal(true);
    setIsValidGoal(false);
  };

  useEffect(() => {
    validate();
  }, [isGoalCommonValidated, isValidAccount, headCountErr]);
  const handleSubmitGoal = () => {
    // TODO: add submit validation
  };
  return (
    <Wrapper>
      <CommonInputSection changeGoalDataHandler={handleGoalCommonChange} />
      <ContentBox>
        <SubTitle>진행 방식</SubTitle>
        <RadioSelectBox
          options={['개인', '그룹']}
          selected={isGroup ? '그룹' : '개인'}
          onChangeHandler={handleSelectIsGroup}
        />
      </ContentBox>
      <DateSelectSection isGroup={isGroup} changeDateSelectHandler={handleGoalDateChange} />
      {isGroup ? (
        <>
          <SubTitle>모집 인원</SubTitle>
          <ContentBox>
            <RowContent>
              <InputWrapper>
                <InputBox
                  placeholder='모집인원을 1명 ~ 100명까지 숫자로 입력해주세요'
                  type='text'
                  value={headCount}
                  onChangeHandler={changeHeadCount}
                />
              </InputWrapper>
              <span>명</span>
            </RowContent>
            <ValidateMsg msg={headCountErr} type='error' />
          </ContentBox>
        </>
      ) : (
        <>
          <ContentBox>
            <SubTitle>목표 공개</SubTitle>
            <RadioSelectBox
              options={['공개', '미공개']}
              selected={isPrivate ? '미공개' : '공개'}
              onChangeHandler={handleSelectIsPrivate}
            />
          </ContentBox>
        </>
      )}
      <ContentBox>
        <SubTitle>잔액 인증 방식</SubTitle>
        <RadioSelectBox
          options={['직접 입력', '실계좌 연결']}
          selected={isAuto ? '실계좌 연결' : '직접 입력'}
          onChangeHandler={handleSelectIsAuto}
        />
        {isAuto && isAuthenticated ? (
          <ValidateMsg
            msg={isValidAccount ? '계좌 인증이 완료되었습니다.' : '계좌 인증이 실패했습니다'}
            type={isValidAccount ? 'success' : 'error'}
          />
        ) : (
          <></>
        )}
        {isAuto && isAuthenticated && isValidAccount ? (
          <AccountInfoCard title='인증된 계좌 정보' formattedAccntInfo={formattedAccntInfo} />
        ) : (
          <></>
        )}
        {isAuto && isAuthenticated && !isValidAccount ? (
          <TextButton text='다시 인증하기' onClickHandler={openModal} />
        ) : (
          <></>
        )}
      </ContentBox>
      {isModalOpen ? (
        <AccountModal
          closeHandler={closeModal}
          isAuthRequested={isAuthRequested}
          reqAuthHandler={handleReqAuthAccnt}
          authHandler={handleAuthAccnt}
        />
      ) : (
        <></>
      )}
      <ContentBox>
        <TextButton text='추가하기' onClickHandler={handleSubmitGoal} isDisabled={!isValidGoal} />
      </ContentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 90%;
  height: calc(100vh - 180px);
  overflow-y: auto;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export default PostGoal;
