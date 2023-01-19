import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import TextButton from '../../common/elem/TextButton';

import { postGoal, postGoalType } from '../../../recoil/goalsAtoms';

const TypeSelect = () => {
  const initialType = useRecoilValue(postGoalType);
  const [isGroup, setIsGroup] = useState<boolean>(initialType.isGroup);
  const setPostGoalType = useSetRecoilState(postGoalType);
  const handleSelect = () => {
    setIsGroup(!isGroup);
  };

  useEffect(() => {
    setPostGoalType({ isGroup: isGroup });
  }, [isGroup]);

  const setPostGoal = useSetRecoilState(postGoal);
  useEffect(() => {
    setPostGoal({
      emoji: '26f0-fe0f',
      title: '',
      description: '',
      hashTag: [''],
      amount: 1000,
      startDate: new Date(),
      endDate: new Date(),
      headCount: 1,
      isPrivate: false,
      isManual: false,
      accntId: 0,
    });
  }, []);

  const navigate = useNavigate();
  return (
    <Wrapper>
      <SelectBoxWrapper>
        <SelectBox selected={!isGroup} onClick={handleSelect}>
          개인
        </SelectBox>
        <SelectBox selected={isGroup} onClick={handleSelect}>
          그룹
        </SelectBox>
      </SelectBoxWrapper>
      <ButtonWrapper>
        <TextButton text='다음' onClickHandler={() => navigate(`/goals/post/data/${isGroup ? 'group' : 'personal'}`)} />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const SelectBox = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(50% - 5px);
  aspect-ratio: 1/1;
  border-radius: 16px;
  color: white;
  background-color: ${(props) => (props.selected ? props.theme.primaryMain : props.theme.primary100)};
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

export default TypeSelect;
