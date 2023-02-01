import React from 'react';
import styled from 'styled-components';

import BankIcons from '../../common/elem/BankIcons';

import { IAccount } from '../../../interfaces/interfaces';

interface MyAccountCardProps {
  account: IAccount;
  onClickHandler: () => void;
}

// TODO: 2차 개발, 실제 계좌 정보 연결
// TODO: 2차 개발, CSS 마무리
const MyAccountCard = ({ account, onClickHandler }: MyAccountCardProps) => {
  return (
    <Wrapper onClick={onClickHandler}>
      <ContentsWrapper>
        <TopLeftContent>
          <BankIcons size={40} name={'은행이름'} />
          <TextContent></TextContent>
        </TopLeftContent>
      </ContentsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-radius: 16px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
`;

const ContentsWrapper = styled.div`
  ::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const TopLeftContent = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const TopRightContent = styled.div`
  float: right;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.div`
  font: ${(props) => props.theme.paragraphsP3R};
`;

const Amount = styled.div`
  font: ${(props) => props.theme.headingH4};
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.primary50};
`;

const ProgressBar = styled.div<{ width: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width};
  height: 8px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.primary500};
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default MyAccountCard;
