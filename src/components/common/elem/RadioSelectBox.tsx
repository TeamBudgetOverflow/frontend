import React from 'react';
import styled from 'styled-components';

interface RadioSelectBoxProps {
  options: Array<string>;
  selected?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  flexDirection?: 'row' | 'column';
  alignItems?: 'center' | 'flex-start';
}

function RadioSelectBox({ options, selected, onChangeHandler, flexDirection, alignItems }: RadioSelectBoxProps) {
  return (
    <Wrapper flexDirection={`${flexDirection}`} alignItems={`${alignItems}`}>
      {options.map((option) => (
        <React.Fragment key={option}>
          <RadioSelectWrapper>
            <input type='radio' value={option} checked={selected === option} onChange={onChangeHandler} />
            <RadioLabel>{option}</RadioLabel>
          </RadioSelectWrapper>
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ flexDirection: string; alignItems: string }>`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  gap: 20px;
`;

const RadioSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: auto;
  align-items: center;
  gap: 16px;
`;

const RadioLabel = styled.span`
  font: ${(props) => props.theme.paragraphsP2M};
`;

export default RadioSelectBox;
