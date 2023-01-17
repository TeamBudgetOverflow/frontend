import React, { useState } from 'react';
import styled from 'styled-components';

import { GoalType } from '../../../pages/PostGoal';
import TextButton from '../../common/elem/TextButton';

interface TypeSelectProps {
  typeSelectHandler: (type: GoalType) => void;
}

const TypeSelect = ({ typeSelectHandler }: TypeSelectProps) => {
  const [selected, setSelected] = useState<GoalType>(GoalType.none);
  const handleSelect = (type: GoalType) => {
    setSelected(type);
  };
  return (
    <>
      <Wrapper>
        <SelectBoxWrapper>
          <SelectBox selected={selected === GoalType.personal} onClick={() => handleSelect(GoalType.personal)}>
            개인
          </SelectBox>
          <SelectBox selected={selected === GoalType.group} onClick={() => handleSelect(GoalType.group)}>
            그룹
          </SelectBox>
        </SelectBoxWrapper>
        <ButtonWrapper>
          <TextButton
            text='다음'
            onClickHandler={() => typeSelectHandler(selected)}
            isDisabled={selected === GoalType.none}
          />
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
