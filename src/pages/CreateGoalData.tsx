import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import GoalInfoInput from '../components/goal/post/GoalInfoInput';
import Info from '../components/common/alert/Info';

import useAccountsData from '../hooks/useAccountsData';

import { postGoal } from '../recoil/goalsAtoms';

import { isManualAccountAddable } from '../utils/accountInfoChecker';

const CreateGoalData = () => {
  const { type } = useParams();
  const { accounts } = useAccountsData();
  const savedPostGoal = useRecoilValue(postGoal);

  return (
    <Wrapper>
      {isManualAccountAddable(accounts) ? (
        <GoalInfoInput isGroup={type === 'group'} initVal={savedPostGoal} />
      ) : (
        <Info type='error'>
          최대 목표 개수만큼 진행 중입니다.
          <SubInfo>
            목표는 최대 10개까지 동시 진행할 수 있습니다.
            <br />
            현재 진행 중인 목표가 완료된 이후, <br />
            목표 생성 및 참여가 가능합니다.
          </SubInfo>
        </Info>
      )}
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
  background-color: white;
`;

const SubInfo = styled.div`
  font: ${(props) => props.theme.paragraphsP3R};
`;

export default CreateGoalData;
