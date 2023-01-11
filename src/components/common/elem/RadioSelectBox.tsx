import React from 'react';
import styled from 'styled-components';

interface RadioSelectBoxProps {
  options: Array<string>;
  selected?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioSelectBox({
  options,
  selected,
  onChangeHandler,
}: RadioSelectBoxProps) {
  return (
    <Wrapper>
      {options.map((option) => (
        <React.Fragment key={option}>
          <input
            type='radio'
            value={option}
            checked={selected === option}
            onChange={onChangeHandler}
          />
          <RadioLabel>{option}</RadioLabel>
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const RadioLabel = styled.span`
  font: ${(props) => props.theme.captionC3};
`;

export default RadioSelectBox;
