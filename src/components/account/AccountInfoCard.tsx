import React from 'react';
import styled from 'styled-components';

import { IAccountInfo } from '../../interfaces/interfaces';

interface AccountInfoCardProps {
  title: string;
  formattedAccntInfo: IAccountInfo;
}

const AccountInfoCard = ({ title, formattedAccntInfo }: AccountInfoCardProps) => {
  return (
    <AccountInfoBox>
      <SubTitle>{title}</SubTitle>
      <Line />
      <InfoBoxRow>
        <Label>은행</Label>
        <Info>{formattedAccntInfo?.bankId}</Info>
      </InfoBoxRow>
      <InfoBoxRow>
        <Label>계좌 번호</Label>
        <Info>{formattedAccntInfo?.accntNo}</Info>
      </InfoBoxRow>
    </AccountInfoBox>
  );
};

const AccountInfoBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: calc(100% - 20px);
  border: 1px solid ${(props) => props.theme.primaryMain};
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const Line = styled.span`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.primaryMain};
`;

const InfoBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Label = styled.span`
  width: 40%;
  font: ${(props) => props.theme.captionC3};
`;

const Info = styled(Label)``;

export default AccountInfoCard;
