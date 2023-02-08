import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import InputBox from '../../common/elem/InputBox';
import Icon from '../../common/elem/Icon';

import useBalanceModify from '../../../hooks/useBalanceModify';
import LoadingIcon from '../../common/elem/LoadingIcon';
import ValidateMsg from '../../common/elem/ValidateMsg';
import CloseIconBtn from '../../common/elem/btn/CloseIconBtn';

interface GoalBalanceCardProps {
  balanceId: number;
  accountId: number;
  maxBalance: number;
  isDisabled: boolean;
  progressModifyHandler: (attainment: number) => void;
}

const GoalBalanceCard = ({
  balanceId,
  accountId,
  maxBalance,
  isDisabled,
  progressModifyHandler,
}: GoalBalanceCardProps) => {
  const {
    isLoadingData,
    isErrorData,
    isLoadingModify,
    isErrorModify,
    isModify,
    inputVal,
    balance,
    isValid,
    handleModifyInput,
    handleInputChange,
    handleBalanceModify,
  } = useBalanceModify({ balanceId, accountId, maxBalance, handleProgressModify: progressModifyHandler });

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [isModify]);

  return (
    <Wrapper>
      <Content>
        <SubTitle>모은 금액</SubTitle>
        {isModify ? (
          <>
            <InputWrapper>
              <InputBoxWrapper>
                <InputBox
                  type='text'
                  value={inputVal}
                  onChangeHandler={handleInputChange}
                  isDisabled={isLoadingModify}
                  ref={inputRef}
                />
                <span>원</span>
              </InputBoxWrapper>
              {!isValid ? (
                <ErrorTooltipWrapper>
                  <Caret />
                  <ErrorTooltip>
                    <ValidateMsg
                      msg={`0 ~ ${maxBalance.toLocaleString()}원 사이의 값만 입력이 가능합니다`}
                      type='error'
                    />
                  </ErrorTooltip>
                </ErrorTooltipWrapper>
              ) : (
                <></>
              )}
            </InputWrapper>
          </>
        ) : (
          <>
            {isLoadingData ? (
              <LoadingText>
                잔액을 조회 중입니다
                <LoadingIcon size={16} color='gray' />
              </LoadingText>
            ) : isErrorData ? (
              <ErrorText>잔액 조회에 실패했습니다</ErrorText>
            ) : (
              <Description>{`${balance.toLocaleString()} 원`}</Description>
            )}
          </>
        )}
        {isModify && isErrorModify ? <ValidateMsg msg='수정을 실패했습니다' type='error' /> : <></>}
      </Content>
      {isModify ? (
        <BtnWrapper>
          <Button disabled={isErrorData || isLoadingData || !isValid} onClick={handleBalanceModify}>
            <Icon
              width={19}
              height={19}
              color={isValid ? '#2BC470' : 'gray'}
              path='M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z'
            />
          </Button>
          <CloseIconBtn color='black' closeHandler={() => handleModifyInput(false)} />
        </BtnWrapper>
      ) : (
        <Button disabled={isErrorData || isLoadingData || isDisabled} onClick={() => handleModifyInput(true)}>
          <Icon
            width={19}
            height={19}
            color='#2BC470'
            path='M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z'
          />
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: calc(100% - 40px);
  border-radius: 16px;
  background-color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ErrorTooltipWrapper = styled.div`
  position: absolute;
  bottom: -100%;
  left: 0;
`;

const ErrorTooltip = styled.div`
  position: relative;
  padding: 4px 12px;
  border-radius: 4px;
  background-color: white;
  white-space: nowrap;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.3);
`;

const Caret = styled.div`
  position: absolute;
  top: -5px;
  left: 10px;
  z-index: 10;
  border-color: transparent transparent white;
  border-style: solid;
  border-width: 0 5px 5px;
`;

const LoadingText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font: ${(props) => props.theme.paragraphsP3R};
  color: ${(props) => props.theme.gray600};
`;

const ErrorText = styled(LoadingText)`
  color: #ff6666;
`;

const Description = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button<{ disabled: boolean }>`
  display: ${(props) => (props.disabled ? 'none' : '')};
  padding: 3px;
  width: 24px;
  height: 24px;
  border: none;
  background-color: white;
`;

export default GoalBalanceCard;
