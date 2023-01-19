import React from 'react';
import styled from 'styled-components';

import Icon from '../../common/elem/Icon';
import BankBox from '../../common/elem/BankBox';

import { IBank } from '../../../interfaces/interfaces';

interface BankListProps {
  banks: Array<IBank>;
  closeHandler: () => void;
  selectHandler: (bank: IBank) => void;
}

const BankList = ({ banks, closeHandler, selectHandler }: BankListProps) => {
  return (
    <Wrapper>
      <TopContent>
        <SubTitle>은행을 선택해주세요</SubTitle>
        <Button onClick={closeHandler}>
          <Icon
            size={24}
            color={'primary400'}
            path='M13.3002 0.709971C12.9102 0.319971 12.2802 0.319971 11.8902 0.709971L7.00022 5.58997L2.11022 0.699971C1.72022 0.309971 1.09021 0.309971 0.700215 0.699971C0.310215 1.08997 0.310215 1.71997 0.700215 2.10997L5.59022 6.99997L0.700215 11.89C0.310215 12.28 0.310215 12.91 0.700215 13.3C1.09021 13.69 1.72022 13.69 2.11022 13.3L7.00022 8.40997L11.8902 13.3C12.2802 13.69 12.9102 13.69 13.3002 13.3C13.6902 12.91 13.6902 12.28 13.3002 11.89L8.41021 6.99997L13.3002 2.10997C13.6802 1.72997 13.6802 1.08997 13.3002 0.709971Z'
          />
        </Button>
      </TopContent>
      <BottomContent>
        {banks.map((bank) => (
          <BankBox key={bank.bankId} id={bank.bankId} name={bank.bankName} selectHandler={() => selectHandler(bank)} />
        ))}
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.paragraphsP1};
`;

const Button = styled.div`
  width: 24px;
  height: 24px;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 12px;
  column-gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;

export default BankList;
