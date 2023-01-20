import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import GoalInfoInput from '../components/goal/post/GoalInfoInput';

import { goalApi } from '../apis/client';

import { IBank } from '../interfaces/interfaces';

import { banksInfo } from '../recoil/accntAtoms';

const CreateGoalData = () => {
  const { type } = useParams();
  const { data: banks } = useQuery<Array<IBank>>('getBanks', () => goalApi.getBanks());
  const setBanksInfo = useSetRecoilState(banksInfo);
  useEffect(() => {
    if (!banks) return;
    setBanksInfo(banks.slice(2, -1));
  }, [banks]);

  return (
    <Wrapper>
      <GoalInfoInput isGroup={type === 'group'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 28px 22px 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 44px);
  height: calc(100% - 48px);
  overflow-y: auto;
  background-color: white;
`;

export default CreateGoalData;
